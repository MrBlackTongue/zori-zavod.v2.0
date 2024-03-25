import { TypeStock } from './TypeStock';
import { Dayjs } from 'dayjs';

export type TypeProductMovement = {
  id?: number;
  amount?: number;
  income?: boolean;
  stock?: TypeStock;
  date?: Dayjs | string;
};
