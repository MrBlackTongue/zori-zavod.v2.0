import { TypeStock } from './TypeStock';
import { Dayjs } from 'dayjs';
import React from 'react';

export type TypeProductMovement = {
  key?: React.Key;
  id?: number;
  amount?: number;
  stock?: TypeStock;
  date?: Dayjs | string;
};
