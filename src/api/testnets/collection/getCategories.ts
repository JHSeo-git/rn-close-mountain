import result from './__mock__/getCategoriesResult.json';
import type { GetCategoriesResponse } from './types';

// TODO: remove mock
export default async function getCategories() {
  const { data } = result as GetCategoriesResponse;

  return data.categories;
}
