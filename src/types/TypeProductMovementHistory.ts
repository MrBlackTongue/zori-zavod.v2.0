import {Dayjs} from 'dayjs';

export type TypeProductMovementHistory = {
  date?: Dayjs | string,
  id?: number,
  title?: string,
  income?: number,
  outcome?: number,
  leftovers?: number,
  unit?: string,
}
export type TypeProductMovementHistoryFilter = {
  id?: number,
}