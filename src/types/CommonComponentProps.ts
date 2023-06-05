export interface TableProps<F = {}> {
  isUpdateTable: boolean;
  openDrawer?: (id: number) => void;
  openDetailDrawer?: (id: number) => void;
  onDelete?: (id: number) => void;
  searchText?: string | undefined;
  filter?: F;
  idDetail?: number | undefined;
}

export interface CreateModalProps<T> {
  isOpen: boolean;
  onCancel: () => void;
  createItem: (values: T) => void;
}

export interface UpdateDrawerProps<T> {
  isOpen: boolean;
  onCancel: () => void;
  selectedItemId: number | undefined;
  updateItem: (values: T) => void;
}

export interface DetailDrawerProps<T> {
  isOpen: boolean;
  onCancel: () => void;
  selectedItemId: number | undefined;
  updateItem?: (values: T) => void;
}