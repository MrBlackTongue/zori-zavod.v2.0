export interface ItemTableProps<T> {
    updateTable: boolean;
    openDrawer: (id: number) => void;
}

export interface AddItemProps<T> {
    isOpen: boolean;
    onCancel: () => void;
    addItem: (values: T) => void;
}

export interface EditItemProps<T> {
    isOpen: boolean;
    closeDrawer: () => void;
    selectedItemId: number | undefined;
    updateItem: (values: T) => void;
}