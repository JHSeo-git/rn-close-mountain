import { ArrayElementType } from '../../../utils/types/type-utils';
import result from './__mock__/getSelectedCollectionsResult.json';

type SelectedCollections = typeof result['data']['query']['search']['edges'];
export type SelectedCollection = ArrayElementType<SelectedCollections>['node'];

export default async function getSelectedCollections() {
  const { data } = result;

  const serialized = data.query.search.edges.map(({ node }) => node);

  return serialized;
}
