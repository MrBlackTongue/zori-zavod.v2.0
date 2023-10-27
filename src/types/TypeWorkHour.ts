import { TypeEmployee } from './TypeEmployee';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { FormInstance } from 'antd/es/form';

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
    | { hours?: number }
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

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
  allEmployee: TypeEmployee[];
  form: FormInstance;
}

export interface Item {
  key: string;
  id: number;
  employee: TypeEmployee;
  workDate: string;
  hours: number;
}

export interface EditableRowProps {
  index: number;
}
