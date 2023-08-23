import {TypeEmployee} from "./TypeEmployee";
import {TypeProductionType} from "./TypeProductionType";

export type TypeWriteOff = {
  id?: number,
  employee?: TypeEmployee,
  productionType?: TypeProductionType,
  description?: string,
}

export type TypeWriteOffFormValue = {
  id?: number,
  employee?: number,
  productionType?: number,
  description?: string,
}

export interface FormWriteOffProps {
  form: any,
  allEmployee: TypeEmployee[],
  onChangeEmployee: (value: string) => void,
  onClearEmployee: () => void,
  onSearchEmployee: (input: string, option: any) => boolean,
  allProductionType: TypeProductionType[],
  onChangeProductionType: (value: string) => void,
  onClearProductionType: () => void,
  onSearchProductionType: (input: string, option: any) => boolean,
}