import {TypeProduct} from "./TypeProduct";
import {Dayjs} from 'dayjs';
import {FormInstance} from "antd/lib/form";

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
    form: FormInstance;
    allProduct: TypeProduct[];
    onChangeProduct: (value: string) => void;
    onClearProduct: () => void;
    onSearchProduct: (input: string, option: any) => boolean;
}