import { TypeStock } from './TypeStock';
import { Dayjs } from 'dayjs';
import { TypeOperationAccounting } from './TypeOperationAccounting';

export type TypeProductionProductMovement = {
  id?: number;
  amount?: number;
  income?: boolean;
  stock?: TypeStock;
  date?: Dayjs | string;
  operationAccounting?: TypeOperationAccounting;
};

export type TypeProductionProductMovementFormValue = {
  amount?: number;
  income?: boolean;
  stock?: number;
  date?: string;
  operationAccounting?: number;
};
