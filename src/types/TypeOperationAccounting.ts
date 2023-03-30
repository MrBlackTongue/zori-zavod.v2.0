import {Dayjs} from "dayjs";
import {TypeOperation} from "./TypeOperation";
import {TypeOutput} from "./TypeOutput";
import {TypeUnit} from "./TypeUnit";
import {TypeOperationTimesheet} from "./TypeOperationTimesheet";

export type TypeOperationAccounting = {
  id? : number,
  date? : Dayjs,
  plan?: number,
  fact?: number,
  operation?: TypeOperation
  output? : TypeOutput,
  unit?: TypeUnit,
  timeSheets?: TypeOperationTimesheet,
}