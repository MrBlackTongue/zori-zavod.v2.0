import { Dayjs } from 'dayjs';

export type TypeStockAdjustment = {
  id?: number;
  title?: string;
  date?: Dayjs | string;
  reason?: string;
};
