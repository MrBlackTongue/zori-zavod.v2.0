import React from "react";
import {AddModalProps, TypeEmployeeFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFormHandler} from "../../../hooks";
import {FormEmployee} from "./FormEmployee";

export const AddModalEmployee: React.FC<AddModalProps<TypeEmployeeFormValue>> = ({
                                                                                   isOpen,
                                                                                   addItem,
                                                                                   onCancel,
                                                                                 }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  return (
    <Modal
      title={`Добавление нового сотрудника`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={500}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormEmployee
        form={form}
      />
    </Modal>
  )
}