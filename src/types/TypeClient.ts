import { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/lib/form';

export type TypeClient = {
  id?: number;
  title?: string;
  lastShipment?: Dayjs | string;
};

export type TypeClientFormValue = {
  id?: number;
  title?: string;
};

export interface FormClientProps {
  form: FormInstance;
}
