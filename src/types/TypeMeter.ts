import {TypeMeterType} from "./TypeMeterType";

export interface TypeMeter {
  id: number;
  serialNumber: string;
  description: string;
  meterType: TypeMeterType;
}