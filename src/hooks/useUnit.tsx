import {useState} from 'react';
import {FormInstance} from 'antd';
import {TypeUnit} from "../types";

export const useUnit = (form: FormInstance) => {
  const [selectedUnit, setSelectedUnit] = useState<TypeUnit>();

  const onChangeUnit = (value: string, option: any): void => {
    const unit: TypeUnit = {
      id: option.id,
      name: value,
    };
    form.setFieldsValue({unit: unit});
    setSelectedUnit(unit);
  };

  return {selectedUnit, onChangeUnit};
}