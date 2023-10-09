import { TypeStock } from './TypeStock';
import { TypeProductBatch } from './TypeProductBatch';
import { TypeWriteOff } from './TypeWriteOff';
import { Dayjs } from 'dayjs';

export type TypeWriteOffMovement = {
  id?: number;
  amount?: number;
  income?: boolean;
  stock?: TypeStock;
  date?: Dayjs | string;
  productBatch?: TypeProductBatch;
  writeOff?: TypeWriteOff;
};

export type TypeWriteOffMovementFormValue = {
  id?: number;
  amount?: number;
  income?: boolean;
  stock?: number;
  date?: string;
  productBatch?: number;
  writeOff?: number;
};
