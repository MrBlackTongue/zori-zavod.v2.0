import { Dayjs } from 'dayjs';
import { TypeOperation } from './TypeOperation';
import { TypeOutput } from './TypeOutput';
import { TypeUnit } from './TypeUnit';
import { TypeOperationTimesheet } from './TypeOperationTimesheet';
import { TypeProductionType } from './TypeProductionType';
import { FormInstance } from 'antd/lib/form';

export type TypeOperationAccounting = {
  id?: number;
  date?: Dayjs | string;
  plan?: number;
  fact?: number;
  average?: number;
  operation?: TypeOperation;
  output?: TypeOutput;
  unit?: TypeUnit;
  timeSheets?: TypeOperationTimesheet[];
  productionType?: TypeProductionType;
};

export type TypeGetAllOperationAccountingResponse = {
  items: TypeOperationAccounting[];
  pageNumber: number;
  pageSize: number;
  total: number;
};

export type TypeOperationAccountingFilter = {
  date?: Dayjs | string;
  operationId?: number;
  productionTypeIds?: number[];
  pageNumber?: number;
  pageSize?: number;
};

export type TypeOperationAccountingFormValue = {
  id?: number;
  date?: string;
  fact?: number;
  operation?: number;
  output?: number;
  productionType?: number;
};

export interface FormOperationAccountingProps {
  form: FormInstance;
  allOperation: TypeOperation[];
  onChangeOperation: (value: string) => void;
  onClearOperation: () => void;
  onSearchOperation: (input: string, option: any) => boolean;
  allOutput: TypeOutput[];
  onChangeOutput: (value: string) => void;
  onClearOutput: () => void;
  onSearchOutput: (input: string, option: any) => boolean;
  allProductionType: TypeProductionType[];
  onChangeProductionType: (value: string) => void;
  onClearProductionType: () => void;
  onSearchProductionType: (input: string, option: any) => boolean;
}
