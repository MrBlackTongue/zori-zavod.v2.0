import { Moment } from 'moment';
import {ProductTypes} from "./ProductTypes";

export type PurchaseType = {
    id?: number,
    amount?: number,
    cost?: number,
    date?: Moment,
    product?: ProductTypes,
    paid?: boolean
}