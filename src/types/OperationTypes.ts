import {UnitTypes} from "./UnitTypes";

export type OperationTypes = {
  id?: number;
  title: string;
  unit: UnitTypes;
  rate: number;
}

export interface OperationsTableProps {
  updateTable: boolean;
  openDrawer: (operationId: number) => void;
}

export interface AddOperationProps {
  isOpen: boolean;
  onCancel: () => void;
  addOperation: (values: OperationTypes) => void;
}

export interface EditOperationProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedOperationId: number | undefined;
  updateOperation: (values: OperationTypes) => void,
}