import {TypeProduct} from "./TypeProduct";

export type TypeStock = {
  id?: number,
  product?: TypeProduct,
  amount?: number,
}
export type TypeStockFilter = {
  id?: number,
}