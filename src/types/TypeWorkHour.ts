import { TypeEmployee } from './TypeEmployee';
import dayjs, { Dayjs } from 'dayjs';

export interface TypeWorkHour {
  weekStartDate: string;
  weekEndDate: string;
  rows: Record<string, TypeRow>;
}

export interface TypeRow {
  employee: TypeEmployee;
  days: Record<string, TypeWorkDay>;
}

export interface TypeWorkDay {
  date: string;
  duration: number;
  id: number;
  workDate?: string;
}

export interface TransformedWorkHour {
  employee: TypeEmployee;
  [date: string]: TypeWorkDay | TypeEmployee;
}

export interface TypeEditingDayState {
  id?: number;
  workDate: string;
  duration: number;
  employee: TypeEmployee | number | undefined;
}

export interface TypeWorkHoursFilter {
  selectedDate?: dayjs.Dayjs;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
}
