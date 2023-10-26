import { TypeEmployee } from './TypeEmployee';
import dayjs, { Dayjs } from 'dayjs';

export type WorkHoursContainer = {
  workHours: WorkHourEntry[];
};

export type TypeWorkHour = {
  employee?: TypeEmployee;
  workHoursContainer?: WorkHoursContainer;
  [key: string]: WorkHoursContainer | WorkHourEntry | TypeEmployee | undefined;
};

export type WorkHourEntry = {
  id?: number;
  workDate?: string;
  hours?: number;
};

export type TypeWorkHoursFilter = {
  selectedDate?: dayjs.Dayjs;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
};

export type RecordType = TypeWorkHour & {
  employee: TypeEmployee;
  [date: string]: WorkHoursContainer | WorkHourEntry | TypeEmployee | undefined;
};
