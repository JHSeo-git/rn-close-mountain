import type { PeriodCode } from '../api/commonCode/types';

export const getDateByPeriod = (period: PeriodCode) => {
  switch (period) {
    case 'LAST_24_HOURS':
      return new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    case 'LAST_7_DAYS':
      return new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    case 'LAST_30_DAYS':
      return new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
  }
};
