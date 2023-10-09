import { TypeEmployee } from './TypeEmployee';
import { TypeProductionType } from './TypeProductionType';
import { FormInstance } from 'antd/lib/form';

export type TypeWriteOff = {
  id?: number;
  employee?: TypeEmployee;
  productionType?: TypeProductionType;
  description?: string;
};

export type TypeWriteOffFormValue = {
  id?: number;
  employee?: number;
  productionType?: number;
  description?: string;
};

export interface FormWriteOffProps {
  form: FormInstance;
  allEmployee: TypeEmployee[];
  onChangeEmployee: (value: string) => void;
  onClearEmployee: () => void;
  onSearchEmployee: (input: string, option: any) => boolean;
  allProductionType: TypeProductionType[];
  onChangeProductionType: (value: string) => void;
  onClearProductionType: () => void;
  onSearchProductionType: (input: string, option: any) => boolean;
}
