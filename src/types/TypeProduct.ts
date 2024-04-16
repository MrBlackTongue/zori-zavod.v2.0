import { TypeCategory } from './TypeCategory';
import { TypeUnit } from './TypeUnit';

export type TypeProduct = {
  id?: number;
  title?: string;
  type?: 'PRODUCT';
  category?: TypeCategory;
  unit?: TypeUnit;
};
