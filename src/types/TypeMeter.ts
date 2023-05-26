import {TypeMeterType} from "./TypeMeterType";

export type TypeMeter = {
  id: number;
  serialNumber: string;
  description: string;
  meterTypeDto: TypeMeterType;
}