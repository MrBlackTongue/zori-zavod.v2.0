import React from "react";
import {AddItemProps, ClientType} from "../../types";
import {Form, Input, Modal} from "antd";

export const AddModalClient: React.FC<AddItemProps<ClientType>> = ({
                                                                      isOpen,
                                                                      addItem,
                                                                      onCancel,
                                                                    }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={`Добавление нового клиента`}
      open={isOpen}
      onCancel={onCancel}
      width={500}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            addItem(values);
          })
          .catch((info) => {
            console.log('Validate failed:', info);
          });
      }}
    >
      <Form
        form={form}
        name="add-new-client"
        initialValues={{
          modifier: 'public'
        }}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Имя"
          name="title"
          rules={[{required: true, message: 'Пожалуйста введите имя'}]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  )
}