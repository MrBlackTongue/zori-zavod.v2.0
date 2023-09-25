import {Dayjs} from "dayjs";

export type TypeClient = {
  id?: number;
  title?: string;
  lastShipment?: Dayjs | string
}

export type TypeClientFormValue = {
  id?: number;
  title?: string;
}

export interface FormClientProps {
  form: any;
}