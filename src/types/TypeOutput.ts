import { TypeProduct } from './TypeProduct';
import { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/lib/form';
import { TypeItem } from './TypeItem';

export type TypeOutput = {
  id?: number;
  date?: Dayjs | string;
  item?: TypeItem;
  quantity?: number;
};

export type TypeOutputFormValue = {
  id?: number;
  date?: string;
  item?: number;
};

export interface FormOutputProps {
  form: FormInstance;
  allProduct: TypeProduct[];
  onChangeProduct: (value: string) => void;
  onClearProduct: () => void;
  onSearchProduct: (input: string, option: any) => boolean;
}
