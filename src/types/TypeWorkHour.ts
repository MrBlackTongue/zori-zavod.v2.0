import { TypeEmployee } from './TypeEmployee';
import dayjs, { Dayjs } from 'dayjs';

export type TypeEmployeeWorkHours = {
  employee?: TypeEmployee;
  workHours?: TypeWorkHour[];
};

export type TypeWorkHour = {
  id?: number;
  employee?: TypeEmployee;
  workDate?: string;
  hours?: number;
};

export type TypeWorkHoursFilter = {
  selectedDate?: dayjs.Dayjs;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
};
