import { FormInstance } from 'antd';

export const useTransformedSelect = (form: FormInstance, fieldName: string) => {
  // Изменить значение в select
  const onChange = (value: { id: number } | undefined) => {
    form.setFieldsValue({ [fieldName]: value });
  };

  // Очистить поле select
  const onClear = () => {
    form.setFieldsValue({ [fieldName]: undefined });
  };

  // Поиск в select
  const onSearch = (searchText: string, option: any) => {
    return option.label.toLowerCase().includes(searchText.toLowerCase());
  };

  return { onChange, onClear, onSearch };
};
