import {ProductTypes} from "./ProductTypes";

export type OutputTypes = {
  id?: number;
  date?: string;
  product?: ProductTypes;
}

export interface OutputsTableProps {
  updateTable: boolean;
  openDrawer: (outputId: number) => void;
}

export interface AddOutputProps {
  isOpen: boolean;
  onCancel: () => void;
  addOutput: (values: OutputTypes) => void;
}

export interface EditOutputProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedOutputId: number | undefined;
  updateOutput: (values: OutputTypes) => void,
}