import { TypeProductGroup } from './TypeProductGroup';
import { TypeUnit } from './TypeUnit';

// Тип для Material, аналогичный TypeProduct
export type TypeMaterial = {
  id?: number;
  name?: string;
  code?: string;
  category?: TypeProductGroup;
  unit?: TypeUnit;
};

export type TypeMaterialFormValue = {
  id?: number;
  name?: string;
  code?: string;
  category?: number;
  unit?: number;
};
