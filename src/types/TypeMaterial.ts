import { TypeCategory } from './TypeCategory';
import { TypeUnit } from './TypeUnit';

export type TypeMaterial = {
  id?: number;
  title?: string;
  code?: string;
  category?: TypeCategory;
  unit?: TypeUnit;
};
