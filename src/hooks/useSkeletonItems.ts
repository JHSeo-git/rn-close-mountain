import { useMemo } from 'react';
import { generateSkeletonList } from '../utils/styleUtils';

export default function useSkeletonItems(count: number = 3) {
  const skeletons = useMemo(() => generateSkeletonList(count), [count]);

  return skeletons;
}
