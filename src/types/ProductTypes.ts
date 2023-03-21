import {UnitTypes} from "./UnitTypes";

export type ProductTypes = {
  id?: number,
  title?: string,
  productGroup?: {
    id?: number,
    title?: string,
    parent?: {
      id?: number,
      title?: string,
    },
  },
  unit?: UnitTypes;
}