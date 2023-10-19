import { TypeEmployee } from './TypeEmployee';
import dayjs, { Dayjs } from 'dayjs';

export type TypeWorkHour = {
  employee?: TypeEmployee;
  workHours?: WorkHourEntry[];
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
