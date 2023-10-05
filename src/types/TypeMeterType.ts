import {TypeUnit} from "./TypeUnit";
import {FormInstance} from "antd/lib/form";

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

export interface FormMeterTypeProps {
  form: FormInstance
  allUnit: TypeUnit[];
  onChangeUnit: (value: string) => void;
  onClearUnit: () => void;
  onSearchUnit: (input: string, option: any) => boolean;
}