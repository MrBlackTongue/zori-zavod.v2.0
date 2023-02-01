import React from "react";
import {AddOperationProps} from "../../../types/operationType";
import {Form, Input, InputNumber, Modal} from "antd";

export const AddOperation: React.FC<AddOperationProps> = ({
                                                          isOpen,
                                                          addOperation,
                                                          onCancel,
                                                        }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={`Добавление новой операции`}
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
            addOperation(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        name="add-new-operation"
        initialValues={{
          modifier: 'public'
        }}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Название операции"
          name="title"
          rules={[{required: true, message: 'Пожалуйста введите название'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Единица измерения"
          name="unit"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Норма"
          name="rate"
          rules={[{
            type: 'number',
            message: 'Пожалуйста напишите ставку цифрами больше 1',
            warningOnly: true,
            // pattern: /[1-9]/,
          }]}
        >
          <InputNumber/>
        </Form.Item>
      </Form>
    </Modal>
  )
}