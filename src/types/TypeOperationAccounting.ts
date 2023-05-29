import {Dayjs} from "dayjs";
import {TypeOperation} from "./TypeOperation";
import {TypeOutput} from "./TypeOutput";
import {TypeUnit} from "./TypeUnit";
import {TypeOperationTimesheet} from "./TypeOperationTimesheet";
import {TypeProductionType} from "./TypeProductionType";

export type TypeOperationAccounting = {
  id?: number,
  date?: Dayjs | string,
  plan?: number,
  fact?: number,
  average?: number,
  operation?: TypeOperation
  output?: TypeOutput,
  unit?: TypeUnit,
  timeSheets?: TypeOperationTimesheet[],
  productionType?: TypeProductionType,
}

export type TypeOperationAccountingFilter = {
  date?: Dayjs | string,
  operationId?: number,
  productionTypeId?: number,
}