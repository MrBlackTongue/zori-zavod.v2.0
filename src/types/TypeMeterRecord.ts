import { Dayjs } from 'dayjs';
import { TypeMeter } from './TypeMeter';
import { FormInstance } from 'antd/lib/form';

export type TypeMeterRecord = {
  id?: number;
  value?: number;
  date?: Dayjs | string;
  meter?: TypeMeter;
};

export type TypeMeterRecordFormValue = {
  id?: number;
  value?: number;
  date?: string;
  meter?: number;
};

export interface FormMeterRecordProps {
  form: FormInstance;
  allMeter: TypeMeter[];
  onChangeMeter: (value: string) => void;
  onClearMeter: () => void;
  onSearchMeter: (input: string, option: any) => boolean;
}
