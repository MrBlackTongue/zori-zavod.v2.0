import { TypeEmployee } from './TypeEmployee';
import dayjs from 'dayjs';

export type TypeWorkHour = {
  id?: number;
  employee?: TypeEmployee;
  workDate?: string;
  hours?: number;
  [key: string]: any;
};

export type TypeWorkHoursFilter = {
  selectedDate?: dayjs.Dayjs;
};
