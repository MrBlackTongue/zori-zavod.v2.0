import {TypeProduct} from "./TypeProduct";
import {Dayjs} from "dayjs";

export type TypeOutput = {
  id?: number;
  date?: Dayjs | string;
  product?: TypeProduct;
}