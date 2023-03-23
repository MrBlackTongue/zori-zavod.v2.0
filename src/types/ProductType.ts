import {UnitType} from "./UnitType";

export type ProductType = {
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
  unit?: UnitType;
}