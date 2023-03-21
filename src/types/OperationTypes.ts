import {UnitTypes} from "./UnitTypes";

export type OperationTypes = {
  id?: number;
  title: string;
  unit: UnitTypes;
  rate: number;
}