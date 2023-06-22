import {Dayjs} from "dayjs";

export type TypeOutputReport = {
  date?: Dayjs | string,
  operationName?: string,
  fact?: number,
  unit?: string,
  hours?: number
}

export type TypeOutputReportFilter = {
  dateFrom?: string;
  dateTo?: string;
  outputId?: number;
}