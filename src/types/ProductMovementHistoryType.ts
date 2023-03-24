import {Dayjs} from 'dayjs';

export type ProductMovementHistoryType = {
    date?: Dayjs,
    id?: number,
    title?: string,
    income?: number,
    outcome?: number,
    leftovers?: number,
    unit?: string,
}