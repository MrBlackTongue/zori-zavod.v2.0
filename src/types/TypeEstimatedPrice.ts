import { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/lib/form';
import { TypeItem } from './TypeItem';

export type TypeEstimatedPrice = {
  id?: number;
  price?: number;
  date?: Dayjs | string;
  item?: TypeItem;
};

export type TypeEstimatedPriceFormValue = {
  id?: number;
  price?: number;
  date?: string;
  item?: number;
};

export interface FormEstimatedPriceProps {
  form: FormInstance;
  allItem: TypeItem[];
  onChangeItem: (value: string) => void;
  onClearItem: () => void;
  onSearchItem: (input: string, option: any) => boolean;
}
