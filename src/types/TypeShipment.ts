import {TypeClient} from "./TypeClient";
import {Dayjs} from "dayjs";

export type TypeShipment = {
  id?: number;
  client?: TypeClient;
  date?: Dayjs;
}