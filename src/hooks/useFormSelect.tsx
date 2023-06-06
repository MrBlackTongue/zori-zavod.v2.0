import {FormInstance} from 'antd';

export const useFormSelect = (form: FormInstance, fieldName: string) => {

  // Изменить значение в селекте
  const onChangeSelect = (value: any): void => {
    form.setFieldsValue({[fieldName]: value});
  };

  // Очистить поле селект
  const onClearSelect = (): void => {
    form.setFieldsValue({[fieldName]: undefined})
  }

  // Поиск в селекте
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }

  return {onChangeSelect, onClearSelect, onSearchSelect};
}