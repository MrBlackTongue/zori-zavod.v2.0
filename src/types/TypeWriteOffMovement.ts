import { TypeStock } from './TypeStock';
import { TypeStockAdjustment } from './TypeStockAdjustment';
import { Dayjs } from 'dayjs';

export type TypeWriteOffMovement = {
  id?: number;
  amount?: number;
  income?: boolean;
  stock?: TypeStock;
  date?: Dayjs | string;
  writeOff?: TypeStockAdjustment;
};

export type TypeWriteOffMovementFormValue = {
  id?: number;
  amount?: number;
  income?: boolean;
  stock?: number;
  date?: string;
  writeOff?: number;
};
