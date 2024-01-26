import { TypeEmployee } from './TypeEmployee';
import { TypeProductionType } from './TypeProductionType';

export type TypeWriteOff = {
  id?: number;
  employee?: TypeEmployee;
  productionType?: TypeProductionType;
  description?: string;
};
