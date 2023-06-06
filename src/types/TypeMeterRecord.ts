import {Dayjs} from "dayjs";
import {TypeMeter} from "./TypeMeter";

export type TypeMeterRecord = {
  id?: number,
  value?: number,
  date?: Dayjs | string,
  meterDto?: TypeMeter,
}

export type TypeMeterRecordFormValue = {
  id?: number,
  value?: number,
  date?: string,
  meterDto?: number,
}

export interface FormMeterRecordProps {
  form: any,
  allMeter: TypeMeter[],
  onChangeMeter: (value: string) => void,
  onClearMeter: () => void,
  onSearchMeter: (input: string, option: any) => boolean,
}