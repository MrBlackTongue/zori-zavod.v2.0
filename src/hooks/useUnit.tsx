import {FormInstance} from 'antd';
import {TypeUnit} from "../types";

export const useUnit = (form: FormInstance) => {

  const onChangeUnit = (value: string, option: any): void => {
    const unit: TypeUnit = {
      id: option.id,
      name: value,
    };
    form.setFieldsValue({unit: unit});
  };

  const onClearUnit = (): void => {
    form.setFieldsValue({unit: undefined})
  }

  return {onChangeUnit, onClearUnit};
}