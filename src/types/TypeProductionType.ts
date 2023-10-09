import { FormInstance } from 'antd/lib/form';

export type TypeProductionType = {
  id?: number;
  title?: string;
  description?: string;
};

export type TypeProductionTypeFormValue = {
  id?: number;
  title?: string;
  description?: string;
};

export interface FormProductTypeProps {
  form: FormInstance;
}
