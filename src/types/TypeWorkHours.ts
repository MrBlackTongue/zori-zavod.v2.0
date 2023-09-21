import {TypeEmployee} from "./TypeEmployee";

export type TypeWorkHours = {
  id: number,
  employee: TypeEmployee
  "workDate": string,
  "hours": number,
}