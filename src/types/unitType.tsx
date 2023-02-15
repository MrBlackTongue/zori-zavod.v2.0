import {TablePaginationConfig} from "antd/es/table";

export type UnitType = {
  id?: number;
  name: string;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}

export interface UnitsTableProps {
  updateTable: boolean;
  openDrawer: (unitId: number) => void;
}

export interface AddUnitProps {
  isOpen: boolean;
  onCancel: () => void;
  addUnit: (values: UnitType) => void;
}

export interface EditUnitProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedUnitId: number | undefined;
  updateUnit: (values: UnitType) => void,
}