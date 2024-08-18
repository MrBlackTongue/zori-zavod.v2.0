import { Dayjs } from 'dayjs';
import { TypeItem } from './TypeItem';

export type TypePurchase = {
  id?: number;
  amount?: number;
  cost?: number;
  date?: Dayjs | string;
  item?: TypeItem;
  paid?: boolean;
};
