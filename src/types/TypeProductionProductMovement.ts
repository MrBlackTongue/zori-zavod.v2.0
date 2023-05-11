import {TypeStock} from "./TypeStock";
import {Dayjs} from "dayjs";
import {TypeProductBatch} from "./TypeProductBatch";
import {TypeOperationAccounting} from "./TypeOperationAccounting";

export type TypeProductionProductMovement = {
  id?: number,
  amount?: number,
  income: boolean,
  stock?: TypeStock,
  date?: Dayjs,
  productBatch?: TypeProductBatch,
  operationAccounting?: TypeOperationAccounting,
}