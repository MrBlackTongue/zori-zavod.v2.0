import {TypeProduct} from "./TypeProduct";
import {Dayjs} from 'dayjs';
import {TypeProductBatch} from "./TypeProductBatch";

export type TypePurchase = {
    id?: number,
    amount?: number,
    cost?: number,
    date?: Dayjs,
    product?: TypeProduct,
    productBatch?: TypeProductBatch,
    paid?: boolean
}