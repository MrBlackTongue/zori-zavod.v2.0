import dayjs from "dayjs";

export interface TableProps<F = {}> {
  isUpdateTable?: boolean;
  openDrawer?: (id: number) => void;
  openDetailDrawer?: (id: number) => void;
  onDelete?: (id: number) => void;
  searchText?: string;
  filter?: F;
  idDetail?: number;
  selectedDate?: dayjs.Dayjs;
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

export interface DetailDrawerProps {
  isOpen: boolean;
  onCancel: () => void;
  selectedItemId: number | undefined;
}