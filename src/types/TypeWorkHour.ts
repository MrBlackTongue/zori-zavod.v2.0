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
  [key: string]:
    | {
        hours?: number;
      }
    | number
    | string
    | TypeEmployee
    | undefined;
};

export type TypeWorkHoursFilter = {
  selectedDate?: dayjs.Dayjs;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
};

export type AggregatedWorkHourData = {
  employee?: TypeEmployee;
  [key: string]:
    | {
        hours?: number;
        id?: number;
      }
    | TypeEmployee
    | undefined;
};

export type DynamicKeysTypeWorkHour = {
  [key: string]: {
    hours?: number;
  };
};

export type CombinedType = TypeWorkHour &
  Omit<DynamicKeysTypeWorkHour, keyof TypeWorkHour>;

const emptyRow: CombinedType = {
  employee: { id: undefined },
};
