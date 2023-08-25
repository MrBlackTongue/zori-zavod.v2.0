import {Dayjs} from "dayjs";

export type TypeEmployeeReport = {
  firstName?: string,
  lastName?: string,
  operationTitle?: string,
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