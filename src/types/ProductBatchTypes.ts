import {UnitTypes} from "./UnitTypes";
//import {ProductBatchTypes} from "./ProductBatchTypes";
import {ProductTypes} from "./ProductTypes";

export type ProductBatchTypes = {
  id? : number,
  amount? : number,
  product? : ProductTypes,
  unit?: UnitTypes;
}

export interface ProductBatchProps {
  updateTable: boolean;
  openDrawer: (productBatchId: number) => void;
}

export interface AddProductProps {
  isOpen: boolean;
  onCancel: () => void;
  addProduct: (values: ProductTypes) => void;
}

export interface EditProductBatchProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedProductId: number | undefined;
  updateProduct: (values: ProductTypes) => void,
}