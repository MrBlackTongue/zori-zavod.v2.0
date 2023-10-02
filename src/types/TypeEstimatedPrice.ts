import {TypeProduct} from "./TypeProduct";
import {Dayjs} from 'dayjs';

export type TypeEstimatedPrice = {
  id?: number,
  price?: number,
  date?: Dayjs | string,
  product?: TypeProduct,
}

export type TypeEstimatedPriceFormValue = {
  id?: number,
  price?: number,
  date?: string,
  product?: number,
}

export interface FormEstimatedPriceProps {
  form: any;
  allProduct: TypeProduct[];
  onChangeProduct: (value: string) => void;
  onClearProduct: () => void;
  onSearchProduct: (input: string, option: any) => boolean;
}