import {FormInstance} from 'antd';

export const useFormField = (form: FormInstance, fieldName: string) => {
  const onChangeField = (value: any): void => {
    form.setFieldsValue({[fieldName]: value});
  };

  const onClearField = (): void => {
    form.setFieldsValue({[fieldName]: undefined})
  }

  const onSearchField = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }

  return {onChangeField, onClearField, onSearchField};
}