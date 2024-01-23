import { TypeStock } from './TypeStock';
import { TypeWriteOff } from './TypeWriteOff';
import { Dayjs } from 'dayjs';

export type TypeWriteOffMovement = {
  id?: number;
  amount?: number;
  income?: boolean;
  stock?: TypeStock;
  date?: Dayjs | string;
  writeOff?: TypeWriteOff;
};

export type TypeWriteOffMovementFormValue = {
  id?: number;
  amount?: number;
  income?: boolean;
  stock?: number;
  date?: string;
  writeOff?: number;
};
