type ErrorName = 'ValidationError';
export type NoContent204Response = {};
export type AxiosErrorResponse = {
  data: object | null;
  error: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
};
