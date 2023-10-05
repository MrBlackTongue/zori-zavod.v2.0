import {TypeProductGroup} from "./TypeProductGroup";
import {TypeUnit} from "./TypeUnit";
import {FormInstance} from "antd/lib/form";

export type TypeProduct = {
  id?: number,
  title?: string,
  productGroup?: TypeProductGroup,
  unit?: TypeUnit;
}

export type TypeProductFormValue = {
  id?: number,
  title?: string,
  productGroup?: number,
  unit?: number;
}

export interface FormProductProps {
  form: FormInstance;
  allUnit: TypeUnit[];
  onChangeUnit: (value: string) => void;
  onClearUnit: () => void;
  onSearchUnit: (input: string, option: any) => boolean;
  allProductGroup: TypeProductGroup[];
  onChangeProductGroup: (value: string) => void;
  onClearProductGroup: () => void;
  onSearchProductGroup: (input: string, option: any) => boolean;
}