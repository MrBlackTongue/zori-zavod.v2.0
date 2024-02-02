import { TypeCategory } from './TypeCategory';
import { TypeUnit } from './TypeUnit';

export type TypeMaterial = {
  id?: number;
  name?: string;
  code?: string;
  category?: TypeCategory;
  unit?: TypeUnit;
};
