import React from "react";
import { AddModalProps, TypeProductGroup } from "../../../types";
import { Form, Input, Modal } from "antd";

export const AddModalProductGroup: React.FC<AddModalProps<TypeProductGroup>> = ({
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
        console.log('Validate failed:', info);
      });
  }

  return (
    <Modal
      title={`Добавление новой группы товаров`}
      open={isOpen}
      onCancel={onCancel}
      width={500}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{ modifier: 'public' }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: 30 }}
      >
        <Form.Item
          label="Название"
          name="title"
          rules={[{ required: true, message: 'введите название группы' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};