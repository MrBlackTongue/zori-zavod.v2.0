import {ProductTypes} from "./ProductTypes";
import {Dayjs} from 'dayjs';

export type PurchaseType = {
    id?: number,
    amount?: number,
    cost?: number,
    date?: Dayjs,
    product?: ProductTypes,
    paid?: boolean
}