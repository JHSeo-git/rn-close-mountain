import type { AxiosRequestConfig, AxiosResponse } from 'axios';

class Manager {
  private INTERVAL = 2000; // 1초로하면 서버에서 1초 내로 인식해버리는 경우가 있어서 2초로 걍 함
  private lastRequestTime: Date | undefined;
  private count = 0;
  isRunning: boolean;

  constructor() {
    this.isRunning = false;
  }

  start() {
    this.count += 1;
    this.isRunning = true;
  }

  end() {
    this.count -= 1;
    this.isRunning = false;
  }

  private wait = (count = 1) => new Promise(resolve => setTimeout(resolve, this.INTERVAL * count));

  requestHandler = (config: AxiosRequestConfig<any>) => {
    return new Promise(async resolve => {
      const now = new Date();

      if (this.isRunning) {
        if (
          this.lastRequestTime &&
          now.getTime() - this.lastRequestTime.getTime() < this.INTERVAL
        ) {
          await this.wait(this.count);
        }
      }

      this.start();
      this.lastRequestTime = new Date();
      resolve(config);
    });
  };

  responseHandler = (response: AxiosResponse<any, any>) => {
    this.end();
    return Promise.resolve(response);
  };

  errorHandler = (error: any) => {
    this.end();
    return Promise.reject(error);
  };
}

export default Manager;
