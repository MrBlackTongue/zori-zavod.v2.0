import { FormInstance } from 'antd';

interface SelectValue {
  id: number;
}

export const useTransformedSelect = (form: FormInstance, fieldName: string) => {
  const onChange = (value: SelectValue | undefined) => {
    form.setFieldsValue({ [fieldName]: value });
  };
  // const onChange = (value: { value: string; label: string }) => {
  //   form.setFieldsValue({ [fieldName]: value ? value.value : undefined });
  // };

  const onClear = () => {
    form.setFieldsValue({ [fieldName]: undefined });
  };

  const onSearch = (searchText: string, option: any) => {
    return option.label.toLowerCase().includes(searchText.toLowerCase());
  };

  return { onChange, onClear, onSearch };
};
