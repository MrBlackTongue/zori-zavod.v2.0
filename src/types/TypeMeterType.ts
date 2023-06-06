import {TypeUnit} from "./TypeUnit";

export type TypeMeterType = {
  id?: number,
  title?: string,
  cost?: number,
  unit?: TypeUnit;
}

export type TypeMeterTypeFormValue = {
  id?: number,
  title?: string,
  cost?: number,
  unit?: number;
}

export interface FormTypeMeterTypeProps {
  form: any
  allUnit: TypeUnit[];
  onChangeUnit: (value: string) => void;
  onClearUnit: () => void;
  onSearchUnit: (input: string, option: any) => boolean;
}