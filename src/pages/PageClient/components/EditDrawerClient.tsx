import {Button, Drawer, Form, Input, Space} from "antd";
import React, {useEffect} from "react";
import {EditItemProps, ClientType} from "../../../types";
import {getClientById} from "../../../services";

export const EditDrawerClient: React.FC<EditItemProps<ClientType>> = ({
                                                                         isOpen,
                                                                         selectedItemId,
                                                                         closeDrawer,
                                                                         updateItem,
                                                                       }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedItemId) {
      getClientById(selectedItemId).then((client) => {
        form.setFieldsValue(client);
      })
    }
  }, [selectedItemId, getClientById]);

  return (
    <Drawer
      title="Редактирование клиента"
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
                updateItem(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          }} type="primary" form='change-client' htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        id='change-client'
        form={form}
        name="change-client"
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