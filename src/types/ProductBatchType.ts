import {UnitType} from "./UnitType";
import {ProductType} from "./ProductType";

export type ProductBatchType = {
  id? : number,
  amount? : number,
  product? : ProductType,
  unit?: UnitType;
}