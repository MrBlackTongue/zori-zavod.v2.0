import { FormInstance } from 'antd/lib/form';

export type TypeStoragePlace = {
  id?: number;
  title?: string;
};

export type TypeStoragePlaceFormValue = {
  id?: number;
  title?: string;
};

export interface FormStoragePlaceProps {
  form: FormInstance;
}
