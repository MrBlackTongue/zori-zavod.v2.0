import {Dayjs} from "dayjs";

export type TypeOutputReport = {
  date?: Dayjs | string,
  title?: string,
  fact?: number,
  hours?: number,
  unit?: string,
}

export type TypeOutputReportFilter = {
  outputId?: number;
  withGrouping?: boolean;
}