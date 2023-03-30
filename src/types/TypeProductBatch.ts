import {TypeUnit} from "./TypeUnit";
import {TypeProduct} from "./TypeProduct";

export type TypeProductBatch = {
  id? : number,
  amount? : number,
  product? : TypeProduct,
  unit?: TypeUnit;
}