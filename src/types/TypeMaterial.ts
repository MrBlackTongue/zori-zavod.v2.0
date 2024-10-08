import { TypeCategory } from './TypeCategory';
import { TypeUnit } from './TypeUnit';

export type TypeMaterial = {
  id?: number;
  title?: string;
  type?: 'MATERIAL';
  code?: string;
  category?: TypeCategory;
  unit?: TypeUnit;
};
