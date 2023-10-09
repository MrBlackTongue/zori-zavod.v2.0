import { TypeClient } from './TypeClient';
import { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/lib/form';

export type TypeShipment = {
  id?: number;
  client?: TypeClient;
  date?: Dayjs | string;
};

export type TypeShipmentFormValue = {
  id?: number;
  client?: number;
  date?: string;
};

export interface FormShipmentProps {
  form: FormInstance;
  allClient: TypeClient[];
  onChangeClient: (value: string) => void;
  onClearClient: () => void;
  onSearchClient: (input: string, option: any) => boolean;
}
