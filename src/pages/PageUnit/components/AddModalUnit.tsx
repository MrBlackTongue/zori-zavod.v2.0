import React from "react";
import {AddModalProps, TypeUnitFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFormHandler} from "../../../hooks";
import {FormUnit} from "./FormUnit";

export const AddModalUnit: React.FC<AddModalProps<TypeUnitFormValue>> = ({
                                                                           isOpen,
                                                                           addItem,
                                                                           onCancel,
                                                                         }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  return (
    <Modal
      title={`Добавление новой единицы измерения`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={500}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormUnit
        form={form}
      />
    </Modal>
  )
}