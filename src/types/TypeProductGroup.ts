import {FormInstance} from "antd/lib/form";

export type TypeProductGroup = {
  id?: number;
  title?: string;
  parent?: TypeProductGroup;
  children?: TypeProductGroup[];
}

export type TypeProductGroupFormValue = {
  id?: number;
  title?: string;
  parent?: number;
}

export interface FormProductGroupProps {
  form: FormInstance;
  allProductGroup: TypeProductGroup[];
  onChangeProductGroup: (value: string) => void;
  onClearProductGroup: () => void;
  onSearchProductGroup: (input: string, option: any) => boolean;
}