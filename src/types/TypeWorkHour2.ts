import {TypeEmployee} from './TypeEmployee';

/* Типы для добавления и редактирования */
export interface TypeEditingDayState {
  id?: number | null;
  employee: TypeEmployee | number | undefined | null;
  workDate: string | null;
  duration: number;
}
