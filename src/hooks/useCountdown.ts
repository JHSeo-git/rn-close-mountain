import { useRef, useState } from 'react';

/**
 * Time is required only less then a day.
 */
const formatTimerDate = (time: number) => {
  return new Date(time).toISOString().substring(14, 19);
};

type TimerRef = {
  timer?: NodeJS.Timeout;
  timeLeft?: number;
};

export default function useCountdown(initialTime = 3 * 60 * 1000, interval = 1000) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isZero, setIsZero] = useState(false);
  const ref = useRef<TimerRef>({});

  const localStop = () => {
    if (ref.current.timer) {
      clearInterval(ref.current.timer);
    }
  };

  const start = () => {
    localStop();

    ref.current.timer = setInterval(() => {
      const localInterval = Math.min(interval, ref.current.timeLeft ?? Infinity);
      setTimeLeft(prev => {
        ref.current.timeLeft = prev - localInterval;
        if (ref.current.timeLeft === 0) {
          localStop();
          setIsZero(true);
        }
        return ref.current.timeLeft;
      });
    }, interval);
  };

  const pause = () => {
    localStop();
  };

  const stop = () => {
    localStop();
    ref.current.timeLeft = 0;
    setTimeLeft(0);
  };

  const reset = () => {
    localStop();
    ref.current.timeLeft = initialTime;
    setTimeLeft(initialTime);
    setIsZero(false);
  };

  const restart = () => {
    reset();
    start();
  };

  return {
    timeLeft,
    timeLeftPad: formatTimerDate(timeLeft),
    isZero,
    start,
    pause,
    stop,
    reset,
    restart,
  };
}
