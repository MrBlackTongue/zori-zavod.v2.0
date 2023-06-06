import {TypeMeterType} from "./TypeMeterType";

export type TypeMeter = {
  id?: number;
  serialNumber?: string;
  description?: string;
  meterTypeDto?: TypeMeterType;
}

export type TypeMeterFormValue = {
  id?: number;
  serialNumber?: string;
  description?: string;
  meterTypeDto?: number;
}

export interface FormMeterProps {
  form: any
  allMeterType: TypeMeterType[];
  onChangeMeterType: (value: string) => void;
  onClearMeterType: () => void;
  onSearchMeterType: (input: string, option: any) => boolean;
}