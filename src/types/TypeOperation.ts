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