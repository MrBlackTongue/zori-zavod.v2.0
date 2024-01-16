import { TypeEmployee } from './TypeEmployee';
import dayjs, { Dayjs } from 'dayjs';

export interface TypeWorkHour {
  weekStartDate: string;
  weekEndDate: string;
  rows: Record<string, TypeRow>;
}

export interface TypeRow {
  employee: TypeEmployee | null;
  days: Record<string, TypeWorkDay>;
}

export interface TypeWorkDay {
  date: string;
  duration: number | null;
  id?: number | null;
  workDate?: string;
}

export interface TransformedWorkHour {
  employee: TypeEmployee | null;
  [date: string]: TypeWorkDay | TypeEmployee | null;
}

export interface TypeEditingDayState {
  id?: number | null;
  workDate: string | null;
  duration: number;
  employee: TypeEmployee | number | undefined | null;
}

export interface TypeWorkHoursFilter {
  selectedDate?: dayjs.Dayjs;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
}
