type AppErrorLabel = 'VALIDATION' | 'API' | 'APP' | 'UNKNOWN';

type AppConstructorParams = {
  message: string;
  name: string;
  label: AppErrorLabel;
  status?: number;
  stack?: string;
};

class AppError extends Error {
  label: AppErrorLabel;
  status: number | undefined;
  constructor({
    message,
    name,
    label = 'UNKNOWN',
    status,
    stack,
  }: AppConstructorParams) {
    super(message);
    this.name = name;
    this.label = label;
    this.status = status;
    this.stack = stack;
  }
}

export default AppError;
