import {Dayjs} from "dayjs";
import {TypeProduct} from "./TypeProduct" ;

export type TypeProductReport = {
    title?: string,
    fact?: number,
    hours?: number,
    unit?: string
}

export type TypeProductReportFilter = {
    dateFrom?: Dayjs | string,
    dateTo?: Dayjs | string,
    product?: TypeProduct,
}