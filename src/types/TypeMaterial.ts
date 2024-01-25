import { TypeProductGroup } from './TypeProductGroup';
import { TypeUnit } from './TypeUnit';

export type TypeMaterial = {
  id?: number;
  name?: string;
  code?: string;
  category?: TypeProductGroup;
  unit?: TypeUnit;
};
