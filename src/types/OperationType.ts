import {UnitType} from "./UnitType";

export type OperationType = {
  id?: number;
  title: string;
  unit: UnitType;
  rate: number;
}