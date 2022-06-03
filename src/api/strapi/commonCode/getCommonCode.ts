import qs from 'qs';
import client from '../client';
import type { GetCommonCodeResponse } from './types';
import type { AxiosRequestConfig } from 'axios';

export type GetCommonCodeRequest = {
  group?: string;
  name?: string;
};

export default async function getCommonCode(
  { group, name }: GetCommonCodeRequest,
  config?: AxiosRequestConfig,
) {
  const query = qs.stringify(
    {
      filters: {
        group: { $eq: group },
        name: { $eq: name },
      },
    },
    { encodeValuesOnly: true },
  );

  const { data } = await client.get<GetCommonCodeResponse>(`/api/common-codes?${query}`, config);

  return data;
}
