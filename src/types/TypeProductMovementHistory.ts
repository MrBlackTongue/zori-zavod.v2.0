import {Dayjs} from 'dayjs';

export type TypeProductMovementHistory = {
  date?: Dayjs,
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