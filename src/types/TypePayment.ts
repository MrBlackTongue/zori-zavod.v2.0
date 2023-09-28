import {Dayjs} from "dayjs";

export type TypePayment = {
  id?: number,
  paymentId?: string,
  paymentDate?:  Dayjs | string,
  amount?: number,
  status?: string,
  tenantId?: number
}

export type TypePaymentFormValue = {
  amount: number,
}

export  type StatusMappingType = {
  [key: string]: string;
}