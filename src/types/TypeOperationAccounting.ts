import {Dayjs} from "dayjs";
import {TypeOperation} from "./TypeOperation";
import {TypeOutput} from "./TypeOutput";
import {TypeUnit} from "./TypeUnit";
import {TypeOperationTimesheet} from "./TypeOperationTimesheet";
import {TypeProductionArea} from "./TypeProductionArea";

export type TypeOperationAccounting = {
  id?: number,
  date?: Dayjs,
  plan?: number,
  fact?: number,
  average?: number,
  operation?: TypeOperation
  output?: TypeOutput,
  unit?: TypeUnit,
  timeSheets?: TypeOperationTimesheet[],
  productionType?: TypeProductionArea,
}

export interface TypeOperationAccountingFilter {
  date?: Dayjs,
  operationId?: number,
  productionTypeId?: number,
}