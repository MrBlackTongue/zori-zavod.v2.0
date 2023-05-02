import React from "react";
import {AddModalProps, TypeUnit} from "../../../types";
import {Form, Input, Modal} from "antd";

export const AddModalUnit: React.FC<AddModalProps<TypeUnit>> = ({
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

  return (
    <Modal
      title={`Добавление новой единицы измерения`}
      open={isOpen}
      onCancel={onCancel}
      width={500}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{modifier: 'public'}}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[{required: true, message: 'введите имя'}]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  )
}