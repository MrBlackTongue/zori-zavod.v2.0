import { TypeCategory, TypeUnit } from '../types';
import { createCategory, createUnit } from '../api';

export const useSimpleSelectActions = () => {
  const onCreateNewUnit = async (value: string): Promise<TypeUnit> => {
    const response = await createUnit({ name: value });
    return response.data;
  };

  const onCreateNewCategory = async (value: string): Promise<TypeCategory> => {
    const response = await createCategory({ title: value });
    return response.data;
  };

  return {
    onCreateNewUnit,
    onCreateNewCategory,
  };
};
