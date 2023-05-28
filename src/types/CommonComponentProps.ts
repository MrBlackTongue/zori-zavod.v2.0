export interface TableProps<F = {}> {
  isUpdateTable: boolean;
  openDrawer?: (id: number) => void;
  openDetailDrawer?: (id: number) => void;
  onDelete?: (id: number) => void;
  searchText?: string | undefined;
  filter?: F;
  idDetail?: number | undefined;
}

export interface AddModalProps<T> {
  isOpen: boolean;
  onCancel: () => void;
  addItem: (values: T) => void;
}

export interface EditDrawerProps<T> {
  isOpen: boolean;
  closeDrawer: () => void;
  selectedItemId: number | undefined;
  updateItem: (values: T) => void;
}

export interface DetailDrawerProps<T> {
  isOpen: boolean;
  closeDrawer: () => void;
  selectedItemId: number | undefined;
  updateItem?: (values: T) => void;
}