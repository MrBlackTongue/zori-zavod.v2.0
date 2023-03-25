import {ProductType} from "./ProductType";

export type StockType = {
  id?: number,
  product?: ProductType,
  amount?: number,
}