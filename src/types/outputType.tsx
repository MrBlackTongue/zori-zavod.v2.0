import {TablePaginationConfig} from "antd/es/table";
import {ProductType} from "./productType";

export type OutputType = {
  id?: number;
  date?: string;
  product?: ProductType;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}

export interface OutputsTableProps {
  updateTable: boolean;
  openDrawer: (outputId: number) => void;
}

export interface AddOutputProps {
  isOpen: boolean;
  onCancel: () => void;
  addOutput: (values: OutputType) => void;
}

export interface EditOutputProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedOutputId: number | undefined;
  updateOutput: (values: OutputType) => void,
}