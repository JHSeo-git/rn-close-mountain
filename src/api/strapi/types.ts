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
