import {TypeUnit} from "./TypeUnit";

export type TypeOperation = {
  id?: number;
  title?: string;
  unit?: TypeUnit;
  rate?: number;
}

export type TypeOperationFormValue = {
  id?: number;
  title?: string;
  unit?: number;
  rate?: number;
}

export interface FormOperationProps {
  form: any;
  allUnit: TypeUnit[];
  onChangeUnit: (value: string) => void;
  onClearUnit: () => void;
  onSearchUnit: (input: string, option: any) => boolean;
}