import { TypeStock } from './TypeStock';
import { Dayjs } from 'dayjs';

export type TypeProductMovement = {
  id?: number;
  amount?: number;
  stock?: TypeStock;
  date?: Dayjs | string;
};
