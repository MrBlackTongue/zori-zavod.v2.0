import {ProductBatchType} from "./ProductBatchType";
import {PurchaseType} from "./PurchaseType";
import {Dayjs} from "dayjs";
import {StockType} from "./StockType";

export type AcceptanceType = {
  id?: number,
  amount?: number,
  income?: true,
  stock?: StockType,
  date?: Dayjs,
  productBatch?: ProductBatchType,
  purchase?: PurchaseType;
}