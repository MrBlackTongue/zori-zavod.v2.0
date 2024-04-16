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
  allCategory: TypeCategory[];
  onChangeCategory: (value: string) => void;
  onClearCategory: () => void;
  onSearchCategory: (input: string, option: any) => boolean;
}
