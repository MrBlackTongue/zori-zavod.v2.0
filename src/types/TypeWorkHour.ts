import { TypeEmployee } from './TypeEmployee';
import dayjs, { Dayjs } from 'dayjs';

export interface TypeWorkHour {
  weekStartDate: string;
  weekEndDate: string;
  rows: {
    [key: string]: {
      employee: TypeEmployee;
      days: { [key: string]: TypeWorkDay };
    };
  };
}

export interface TypeWorkDay {
  id?: number | null;
  date: string;
  duration: number | null;
}

export interface TypeTransformedWorkHour {
  employee: TypeEmployee | null;
  [date: string]: TypeWorkDay | TypeEmployee | null;
}

export interface TypeEditingDayState {
  id?: number | null;
  employee: TypeEmployee | number | undefined | null;
  workDate: string | null;
  duration: number;
}

/* Типы для фильтров для главного запроса */
export interface TypeWorkHoursFilter2 {
  employee?: string;
  startDate: string;
  endDate: string;
}

export interface TypeWorkHoursFilter {
  selectedDate?: dayjs.Dayjs;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
}
