import React, {useState, useEffect} from "react";
import {Form, Modal} from "antd";
import {AddModalProps, TypeMeterTypeFormValue, TypeUnit} from "../../../types";
import {getAllUnit} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormOperation} from "./FormMeterType";

export const AddModalMeterType: React.FC<AddModalProps<TypeMeterTypeFormValue>> = ({
                                                                                     isOpen,
                                                                                     addItem,
                                                                                     onCancel,
                                                                                   }) => {
  const [form] = Form.useForm();

  // Все единицы измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем unit
  const {
    onChangeField: onChangeUnit,
    onClearField: onClearUnit,
    onSearchField: onSearchUnit
  } = useFormField(form, 'unit');

  useEffect(() => {
    getAllUnit().then((allUnit) => {
      setAllUnit(allUnit);
    });
  }, []);

  return (
    <Modal
      title={`Добавление нового типа счетчика`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={700}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormOperation
        form={form}
        allUnit={allUnit}
        onChangeUnit={onChangeUnit}
        onClearUnit={onClearUnit}
        onSearchUnit={onSearchUnit}
      />
    </Modal>
  )
}