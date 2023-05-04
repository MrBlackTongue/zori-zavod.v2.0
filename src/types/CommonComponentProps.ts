export interface TableProps<T> {
  isUpdateTable: boolean;
  openDrawer?: (id: number) => void;
  onDelete?: (id: number) => void;
  searchText?: string | undefined;
  filter?: {
    dateFilter?: string | undefined,
    idFilter?: number | undefined,
  }
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