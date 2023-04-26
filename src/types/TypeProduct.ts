import {TypeProductGroup} from "./TypeProductGroup";
import {TypeUnit} from "./TypeUnit";

export type TypeProduct = {
  id?: number,
  title?: string,
  productGroup?: TypeProductGroup,
  unit?: TypeUnit;
}