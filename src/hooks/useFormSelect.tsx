import { FormInstance } from 'antd';

export const useFormSelect = (form: FormInstance, fieldName: string) => {
  // Изменить значение в select
  const onChangeSelect = (value: any): void => {
    form.setFieldsValue({ [fieldName]: value });
  };

  // Очистить поле select
  const onClearSelect = (): void => {
    form.setFieldsValue({ [fieldName]: undefined });
  };

  // Поиск в select
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  };

  return { onChangeSelect, onClearSelect, onSearchSelect };
};
