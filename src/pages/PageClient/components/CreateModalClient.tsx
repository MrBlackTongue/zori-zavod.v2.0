import React from "react";
import {CreateModalProps, TypeClientFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFormHandler} from "../../../hooks";
import {FormClient} from "./FormClient";

export const CreateModalClient: React.FC<CreateModalProps<TypeClientFormValue>> = ({
                                                                                     isOpen,
                                                                                     createItem,
                                                                                     onCancel,
                                                                                   }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

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