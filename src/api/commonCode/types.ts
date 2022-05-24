import type { Data, Meta } from '../types';

export type ChainCode = 'ETH' | 'SOL';
export type CategoryCode = 'NEW' | 'ART' | 'MUSIC' | 'PHOTOGRAPHY' | 'SPORTS' | 'UTILITY';
export type PeriodCode = 'LAST_24_HOURS' | 'LAST_7_DAYS' | 'LAST_30_DAYS' | 'ALL_TIME';
export type CommonValueType = ChainCode | CategoryCode | PeriodCode;

export type CommonCodeInfo = {
  group: string;
  code: CommonValueType;
  codeName: string;
  value: string;
  use: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CommonCodeData = Data<CommonCodeInfo>;
export type GetCommonCodeResponse = {
  data: CommonCodeData[];
  meta: Meta;
};
