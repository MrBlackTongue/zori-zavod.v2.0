import {Dayjs} from "dayjs";
import {TypeEmployee} from "./TypeEmployee";

export type TypeEmployeeReport = {
  firstName?: TypeEmployee,
  lastName?: TypeEmployee,
  title?: string,
  date?: Dayjs | string,
  hours?: number,
  fact?: number,
  performance?: number,
}

export type TypeEmployeeReportFilter = {
  employeeId?: number,
  operationId?:number,
  dateFrom?: Dayjs | string,
  dateTo?: Dayjs | string,
}