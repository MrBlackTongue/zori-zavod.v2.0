import {TypeEmployee} from "./TypeEmployee";
import {FormInstance} from "antd/lib/form";

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
  form: FormInstance,
  allEmployee: TypeEmployee[],
  onChangeEmployee: (value: string) => void,
  onClearEmployee: () => void,
  onSearchEmployee: (input: string, option: any) => boolean,
}