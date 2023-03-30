import {TypeUnit} from "./TypeUnit";

export type TypeProduct = {
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
  unit?: TypeUnit;
}