import {TablePaginationConfig} from "antd/es/table";
import {UnitType} from "./unitType";

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

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}

export interface ProductsTableProps {
  updateTable: boolean;
  openDrawer: (productId: number) => void;
}

export interface AddProductProps {
  isOpen: boolean;
  onCancel: () => void;
  addProduct: (values: ProductType) => void;
}

export interface EditProductProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedProductId: number | undefined;
  updateProduct: (values: ProductType) => void,
}