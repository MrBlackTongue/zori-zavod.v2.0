import React from "react";
import {AddModalProps, TypeProductionArea} from "../../../types";
import {Form, Input, Modal} from "antd";

export const AddModalProductionArea: React.FC<AddModalProps<TypeProductionArea>> = ({
                                                                                      isOpen,
                                                                                      addItem,
                                                                                      onCancel,
                                                                                    }) => {
  const [form] = Form.useForm();

  // Функция подтверждения добавления
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addItem(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }

  // Функция закрытия модального окна
  const handleClose = () => {
    form.resetFields();
    onCancel()
  };

  return (
    <Modal
      title={`Добавление нового типа производства`}
      open={isOpen}
      onCancel={handleClose}
      width={550}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{modifier: 'public',}}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Название"
          name="title"
          rules={[{required: true, message: 'введите название'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Описание"
          name="description"
          rules={[{required: true, message: 'введите описание'}]}
        >
          <Input.TextArea/>
        </Form.Item>
      </Form>
    </Modal>
  )
}