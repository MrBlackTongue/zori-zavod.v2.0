import {Button, Drawer, Form, Input, InputNumber, Space} from "antd";
import React, {useEffect, useState} from "react";
import {EditOperationProps, OperationType} from "../../../types/operationType";
import {getOperationById} from "../../../requests/operationsRequests";

export const EditOperation: React.FC<EditOperationProps> = ({
                                                            isOpen,
                                                            selectedOperationId,
                                                            closeDrawer,
                                                            updateOperation,
                                                          }) => {
  const [form] = Form.useForm();

  const [operation] = useState<OperationType | null>(null);

  useEffect(() => {
    if (selectedOperationId) {
      getOperationById(selectedOperationId).then((operation) => {
        form.setFieldsValue(operation);
      })
    }
  }, [selectedOperationId, getOperationById]);

  return (
    <Drawer
      title="Редактирование операции"
      width={600}
      open={isOpen}
      onClose={closeDrawer}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={closeDrawer}>Отмена</Button>
          <Button onClick={() => {
            closeDrawer()
            form
              .validateFields()
              .then((values) => {
                // form.resetFields()
                updateOperation(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          }} type="primary" form='change-worker' htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        name="change-operation"
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
        <Form.Item
          name='id'>
        </Form.Item>
      </Form>
    </Drawer>
  )
}