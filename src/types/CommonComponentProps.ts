export interface TableProps<T> {
  isUpdateTable: boolean;
  openDrawer: (id: number) => void;
  searchText?: string | undefined;
  filterById?: number | undefined;
  filterByTable?: {
    date?: string,
    operationId?: number,
  }
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