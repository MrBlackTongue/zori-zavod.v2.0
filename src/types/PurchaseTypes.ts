import { Moment } from 'moment';
import {ProductTypes} from "./ProductTypes";

export type PurchaseTypes = {
    id?: number,
    amount?: number,
    cost?: number,
    date?: Moment,
    product?: ProductTypes,
    paid?: boolean
}

export interface TableProps<T> {
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