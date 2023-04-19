import {Dayjs} from "dayjs";
import {TypeStock} from "./TypeStock";

export type TypeShipmentProductMovement = {
  id?: number,
  amount?: number,
  income?: boolean,
  stock?: TypeStock,
  date?: Dayjs,
}