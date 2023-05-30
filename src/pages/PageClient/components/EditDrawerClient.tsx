import React, {useCallback, useEffect} from "react";
import {Button, Drawer, Form, Input, Space} from "antd";
import {EditDrawerProps, TypeClient} from "../../../types";
import {getClientById} from "../../../services";

export const EditDrawerClient: React.FC<EditDrawerProps<TypeClient>> = ({
                                                                          isOpen,
                                                                          selectedItemId,
                                                                          closeDrawer,
                                                                          updateItem,
                                                                        }) => {
  const [form] = Form.useForm();

  // Функция подтверждения редактирования
  const handleOk = (): void => {
    closeDrawer()
    form
      .validateFields()
      .then((values) => {
        // form.resetFields()
        updateItem(values);
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      })
  };

  // Функция для получения данных в дравер
  const handleGetClient = useCallback((): void => {
    if (selectedItemId) {
      getClientById(selectedItemId).then((client) => {
        form.setFieldsValue(client);
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    handleGetClient()
  }, [selectedItemId, handleGetClient]);

  return (
    <Drawer
      title="Редактирование клиента"
      width={600}
      open={isOpen}
      onClose={closeDrawer}
      extra={
        <Space>
          <Button onClick={closeDrawer}>Отмена</Button>
          <Button onClick={handleOk} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Имя"
          name="title"
          rules={[{required: true, message: 'введите имя'}]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </Drawer>
  )
}