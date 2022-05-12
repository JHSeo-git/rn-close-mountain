import { useRef, useState } from 'react';

type TimerRef = {
  timer?: NodeJS.Timeout;
  timeLeft?: number;
};

export default function useCountdown(initialTime = 3 * 60 * 1000, interval = 1000) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const ref = useRef<TimerRef>({});

  const localStop = () => {
    if (ref.current.timer) {
      clearInterval(ref.current.timer);
    }
  };

  const start = () => {
    localStop();

    ref.current.timer = setInterval(() => {
      const localInterval = Math.min(interval, timeLeft);
      setTimeLeft(prev => {
        if (localInterval === 0) {
          localStop();
        }
        ref.current.timeLeft = prev - localInterval;
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
  };

  const restart = () => {
    reset();
    start();
  };

  return {
    start,
    pause,
    stop,
    reset,
    restart,
  };
}
