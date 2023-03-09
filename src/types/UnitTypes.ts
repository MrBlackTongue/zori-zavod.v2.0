export type UnitTypes = {
  id?: number;
  name: string;
}

export interface UnitsTableProps {
  updateTable: boolean;
  openDrawer: (unitId: number) => void;
}

export interface AddUnitProps {
  isOpen: boolean;
  onCancel: () => void;
  addUnit: (values: UnitTypes) => void;
}

export interface EditUnitProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedUnitId: number | undefined;
  updateUnit: (values: UnitTypes) => void,
}