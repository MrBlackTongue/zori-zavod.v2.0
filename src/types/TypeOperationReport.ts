import {Dayjs} from "dayjs";

export type TypeOperationReport = {
  operationName?: string,
  hours?: number,
  fact?: number,
  unit?: string,
}

export type TypeOperationReportFilter = {
  dateFrom?: Dayjs | string,
  dateTo?: Dayjs | string
}