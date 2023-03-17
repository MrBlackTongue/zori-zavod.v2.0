import {UnitTypes} from "./UnitTypes";
import {ProductTypes} from "./ProductTypes";

export type ProductBatchTypes = {
  id? : number,
  amount? : number,
  product? : ProductTypes,
  unit?: UnitTypes;
}