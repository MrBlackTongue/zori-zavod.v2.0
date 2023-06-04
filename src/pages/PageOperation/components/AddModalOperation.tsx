import React from "react";
import {AddModalProps, TypeOperationFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchData, useFormField, useFormHandler} from "../../../hooks"
import {FormOperation} from "./FormOperation";

export const AddModalOperation: React.FC<AddModalProps<TypeOperationFormValue>> = ({
                                                                                     isOpen,
                                                                                     addItem,
                                                                                     onCancel,
                                                                                   }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allUnit} = useFetchData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем unit
  const {
    onChangeField: onChangeUnit,
    onClearField: onClearUnit,
    onSearchField: onSearchUnit,
  } = useFormField(form, 'unit');

  return (
    <Modal
      title={`Добавление новой операции`}
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