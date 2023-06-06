import {TypeEmployee} from "./TypeEmployee";

export type TypeOperationTimesheet = {
  id?: number,
  hours?: number,
  employee?: TypeEmployee,
  operationAccountingId?: number,
  fact?: number,
}

export type TypeOperationTimesheetFormValue = {
  id?: number,
  hours?: number,
  employee?: number,
  operationAccountingId?: number,
  fact?: number,
}

export interface FormOperationTimesheetProps {
  form: any,
  allEmployee: TypeEmployee[],
  onChangeEmployee: (value: string) => void,
  onClearEmployee: () => void,
  onSearchEmployee: (input: string, option: any) => boolean,
}