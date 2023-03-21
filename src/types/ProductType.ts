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

export interface ProductsTableProps {
  updateTable: boolean;
  openDrawer: (productId: number) => void;
}

export interface AddProductProps {
  isOpen: boolean;
  onCancel: () => void;
  addProduct: (values: ProductTypes) => void;
}

export interface EditProductProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedProductId: number | undefined;
  updateProduct: (values: ProductTypes) => void,
}