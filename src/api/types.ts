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
export type Data<AttributeT> = {
  id: number;
  attributes: AttributeT;
};
export type PopluateData<DataT> = {
  data: DataT;
};
export type Meta = {
  pagination: Pagination;
};
export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};
