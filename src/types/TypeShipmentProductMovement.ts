import {Dayjs} from "dayjs";
import {TypeStock} from "./TypeStock";
import {TypeShipment} from "./TypeShipment";

export type TypeShipmentProductMovement = {
  id?: number,
  amount?: number,
  income?: boolean,
  stock?: TypeStock,
  date?: Dayjs | string,
  shipment?: TypeShipment
}