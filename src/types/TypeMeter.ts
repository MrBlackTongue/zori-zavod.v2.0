import {TypeMeterType} from "./TypeMeterType";

export type TypeMeter = {
  id?: number,
  serialNumber?: string,
  title?: string,
  meterType?: TypeMeterType,
}

export type TypeMeterFormValue = {
  id?: number,
  serialNumber?: string,
  title?: string,
  meterType?: number,
}

export interface FormMeterProps {
  form: any,
  allMeterType: TypeMeterType[],
  onChangeMeterType: (value: string) => void,
  onClearMeterType: () => void,
  onSearchMeterType: (input: string, option: any) => boolean,
}