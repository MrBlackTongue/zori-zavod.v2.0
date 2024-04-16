import { TypeCategory } from './TypeCategory';
import { TypeUnit } from './TypeUnit';

export type TypeItem = {
  id?: number;
  title?: string;
  type?: 'PRODUCT' | 'MATERIAL';
  category?: TypeCategory;
  unit?: TypeUnit;
};
