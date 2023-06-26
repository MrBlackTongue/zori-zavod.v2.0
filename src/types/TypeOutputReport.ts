import {Dayjs} from "dayjs";
import {TypeOutput} from "./TypeOutput";

export type TypeOutputReport = {
  date?: Dayjs | string,
  title?: TypeOutput,
  fact?: number,
  hours?: number,
  unit?: string,
}

export type TypeOutputReportFilter = {
  outputId?: number;
  withGrouping?: boolean;
}