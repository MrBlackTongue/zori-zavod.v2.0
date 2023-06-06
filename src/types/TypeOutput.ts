import {TypeProduct} from "./TypeProduct";
import {Dayjs} from "dayjs";

export type TypeOutput = {
  id?: number;
  date?: Dayjs | string;
  product?: TypeProduct;
}

export type TypeOutputFormValue = {
  id?: number;
  date?: string;
  product?: number;
}

export interface FormOutputProps {
  form: any;
  allProduct: TypeProduct[];
  onChangeProduct: (value: string) => void;
  onClearProduct: () => void;
  onSearchProduct: (input: string, option: any) => boolean;
}