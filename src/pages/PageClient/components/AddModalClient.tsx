import React from "react";
import {AddModalProps, TypeClientFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFormHandler} from "../../../hooks";
import {FormClient} from "./FormClient";

export const AddModalClient: React.FC<AddModalProps<TypeClientFormValue>> = ({
                                                                               isOpen,
                                                                               addItem,
                                                                               onCancel,
                                                                             }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  return (
    <Modal
      title={`Добавление нового клиента`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={500}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormClient
        form={form}
      />
    </Modal>
  )
}