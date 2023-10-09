import {TypeProduct} from "./TypeProduct";
import {FormInstance} from "antd/lib/form";

export type TypeProductBatch = {
  id? : number,
  amount? : number,
  product? : TypeProduct,
}

export type TypeProductBatchFormValue = {
  id? : number,
  amount? : number,
  product? : number,
}

export interface FormProductBatchProps {
  form: FormInstance;
  allProduct: TypeProduct[];
  onChangeProduct: (value: string) => void;
  onClearProduct: () => void;
  onSearchProduct: (input: string, option: any) => boolean;
}