import { TypeProductBatch } from './TypeProductBatch';
import { TypePurchase } from './TypePurchase';
import { Dayjs } from 'dayjs';
import { TypeStock } from './TypeStock';

export type TypeAcceptance = {
  id?: number;
  amount?: number;
  income?: true;
  stock?: TypeStock;
  date?: Dayjs | string;
  productBatch?: TypeProductBatch;
  purchase?: TypePurchase;
};

export type TypeAcceptanceFormValue = {
  amount?: number;
  income?: true;
  stock?: number;
  date?: string;
  productBatch?: number;
  purchase?: number;
};
