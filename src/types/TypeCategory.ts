import { FormInstance } from 'antd/lib/form';

export type TypeCategory = {
  id?: number;
  title?: string;
  parent?: TypeCategory;
  children?: TypeCategory[];
};

export type TypeCategoryFormValue = {
  id?: number;
  title?: string;
  parent?: number;
};

export interface FormCategoryProps {
  form: FormInstance;
  allProductGroup: TypeCategory[];
  onChangeProductGroup: (value: string) => void;
  onClearProductGroup: () => void;
  onSearchProductGroup: (input: string, option: any) => boolean;
}
