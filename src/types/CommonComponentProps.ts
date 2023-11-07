import { FormInstance } from 'antd';

export interface TableProps<F = {}> {
  isUpdateTable?: boolean;
  openDrawer?: (id: number) => void;
  openDetailDrawer?: (id: number) => void;
  onDelete?: (id: number) => void;
  searchText?: string;
  filter?: F;
  idDetail?: number;
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

export interface FormProps<T> {
  form: FormInstance<T>;
  title: string;
  onFinish: (values: T) => void;
  onCancel: () => void;
}
