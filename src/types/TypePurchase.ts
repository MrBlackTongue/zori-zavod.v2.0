import {TypeProduct} from "./TypeProduct";
import {Dayjs} from 'dayjs';

export type TypePurchase = {
    id?: number,
    amount?: number,
    cost?: number,
    date?: Dayjs | string,
    product?: TypeProduct,
    paid?: boolean,
}

export type TypePurchaseFormValue = {
    id?: number,
    amount?: number,
    cost?: number,
    date?: string,
    product?: number,
    productBatch?: number,
    paid?: boolean,
}

export interface FormPurchaseProps {
    form: any;
    allProduct: TypeProduct[];
    onChangeProduct: (value: string) => void;
    onClearProduct: () => void;
    onSearchProduct: (input: string, option: any) => boolean;
}