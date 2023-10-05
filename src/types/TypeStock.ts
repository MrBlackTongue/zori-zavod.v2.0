import {TypeProduct} from "./TypeProduct";
import {FormInstance} from "antd/lib/form";

export type TypeStock = {
  id?: number,
  product?: TypeProduct,
  amount?: number,
}

export type TypeStockFilter = {
  id?: number,
}

export type TypeStockFormValue = {
  id?: number,
  product?: number,
  amount?: number,
}

export interface FormStockProps {
  form: FormInstance;
  allProduct: TypeProduct[];
  onChangeProduct: (value: string) => void;
  onClearProduct: () => void;
  onSearchProduct: (input: string, option: any) => boolean;
}