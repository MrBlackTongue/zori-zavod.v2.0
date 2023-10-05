import {TypeProduct} from "./TypeProduct";
import {FormInstance} from "antd/lib/form";
import {TypeStoragePlace} from "./TypeStoragePlace";

export type TypeStock = {
  id?: number,
  product?: TypeProduct,
  amount?: number,
  storagePlace?: TypeStoragePlace,
}

export type TypeStockFilter = {
  id?: number,
}

export type TypeStockFormValue = {
  id?: number,
  product?: number,
  amount?: number,
  storagePlace?: number,
}

export interface FormStockProps {
  form: FormInstance;
  allProduct: TypeProduct[];
  onChangeProduct: (value: string) => void;
  onClearProduct: () => void;
  onSearchProduct: (input: string, option: any) => boolean;
  allStoragePlace: TypeStoragePlace[];
  onChangeStoragePlace: (value: string) => void;
  onClearStoragePlace: () => void;
  onSearchStoragePlace: (input: string, option: any) => boolean;
}