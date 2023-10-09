import { FormInstance } from 'antd/lib/form';

export type TypeUnit = {
  id?: number;
  name?: string;
};

export type TypeUnitFormValue = {
  id?: number;
  name?: string;
};

export interface FormUnitProps {
  form: FormInstance;
}
