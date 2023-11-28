import { FormInstance } from 'antd';

export const useTransformedSelect = (form: FormInstance, fieldName: string) => {
  const onChange = (value: { id: number } | undefined) => {
    form.setFieldsValue({ [fieldName]: value });
  };

  const onClear = () => {
    form.setFieldsValue({ [fieldName]: undefined });
  };

  const onSearch = (searchText: string, option: any) => {
    return option.label.toLowerCase().includes(searchText.toLowerCase());
  };

  return { onChange, onClear, onSearch };
};
