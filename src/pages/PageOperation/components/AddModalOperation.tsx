import React, {useState, useEffect} from "react";
import {AddModalProps, TypeOperationFormValue, TypeUnit} from "../../../types";
import {Form, Modal} from "antd";
import {getAllUnit} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks"
import {FormOperation} from "./FormOperation";

export const AddModalOperation: React.FC<AddModalProps<TypeOperationFormValue>> = ({
                                                                                     isOpen,
                                                                                     addItem,
                                                                                     onCancel,
                                                                                   }) => {
  const [form] = Form.useForm();

  // Все единицы измерения, выбраная единица измерения
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
      title={`Добавление новой операции`}
      width={700}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
      okText={'Сохранить'}
      cancelText={'Отмена'}
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