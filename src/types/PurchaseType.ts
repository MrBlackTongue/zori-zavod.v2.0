import {ProductType} from "./ProductType";
import {Dayjs} from 'dayjs';

export type PurchaseType = {
    id?: number,
    amount?: number,
    cost?: number,
    date?: Dayjs,
    product?: ProductType,
    paid?: boolean
}