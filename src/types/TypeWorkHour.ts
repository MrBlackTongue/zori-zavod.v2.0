import { TypeEmployee } from './TypeEmployee';
import dayjs, { Dayjs } from 'dayjs';

// import { FormInstance } from 'antd';
// import React from 'react';

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
  hours: number;
}

export interface TransformedWorkHour {
  employee: TypeEmployee;

  [date: string]: TypeWorkDay | TypeEmployee;
}

export interface TypeWorkHoursFilter {
  selectedDate?: dayjs.Dayjs;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
}

// export interface TypeWorkHour {
//   weekStartDate: string;
//   weekEndDate: string;
//   rows: Record<string, TypeWorkHoursRow>;
// }
//
// // Описываем строки таблицы рабочих часов
// export interface TypeWorkHoursRow {
//   employee: TypeEmployee;
//   days: Record<string, TypeWorkDay>;
// }
//
// // Описываем информацию о рабочем дне
// export interface TypeWorkDay {
//   date: string;
//   hours: number;
// }

// export interface EditableCellProps {
//   title: React.ReactNode;
//   editable: boolean;
//   children: React.ReactNode;
//   dataIndex: string;
//   record: Item;
//   handleSave: (record: Item) => void;
//   allEmployee: TypeEmployee[];
//   form: FormInstance;
// }
//
// export interface Item {
//   [key: string]: any;
//   id: number;
//   employee: TypeEmployee;
//   workDate: Record<string, TypeWorkDay>;
//   hours: number;
// }
//
// export interface EditableRowProps {
//   index: number;
// }
