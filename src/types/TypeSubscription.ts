import { Dayjs } from 'dayjs';

export type TypeSubscription = {
  id: number;
  customer: {
    id: number;
    email: string;
    password: string;
    phone: string;
    firstname: string;
    balance: number;
    enabled: boolean;
    authorities: [authority: string];
    username: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
  };
  plan: {
    id: number;
    title: string;
    price: number;
    durationDays: number;
  };
  startDate: Dayjs | string;
  endDate: Dayjs | string;
};
