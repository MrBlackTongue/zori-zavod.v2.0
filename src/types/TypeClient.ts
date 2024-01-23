import { Dayjs } from 'dayjs';

export type TypeClient = {
  id?: number;
  title?: string;
  lastShipment?: Dayjs | string;
};
