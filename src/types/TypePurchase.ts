import { TypeProduct } from './TypeProduct';
import { Dayjs } from 'dayjs';

export type TypePurchase = {
  id?: number;
  amount?: number;
  cost?: number;
  date?: Dayjs | string;
  product?: TypeProduct;
  paid?: boolean;
};
