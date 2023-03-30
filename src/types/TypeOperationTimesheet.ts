import {TypeEmployee} from "./TypeEmployee";

export type TypeOperationTimesheet = [
  {
    id?: number,
    hours?: number,
    employee?: TypeEmployee,
    operationAccountingId?: number,
    fact?: number,
  }
]