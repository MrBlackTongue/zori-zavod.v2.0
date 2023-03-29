import {Button, Checkbox, Drawer, Form, Input, InputNumber, Space} from "antd";
import React, {useEffect, useState} from "react";
import {EditDrawerProps, TypeEmployee} from "../../../types";
import {getEmployeeById} from "../../../services";
import {CheckboxChangeEvent} from "antd/es/checkbox";

export const EditDrawerEmployee: React.FC<EditDrawerProps<TypeEmployee>> = ({
                                                                              isOpen,
                                                                              selectedItemId,
                                                                              closeDrawer,
                                                                              updateItem,
                                                                            }) => {
  const [form] = Form.useForm();

  const [employee] = useState<TypeEmployee | null>(null);

  const [hired, setHired] = useState(employee?.hired)

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    setHired(e.target.checked);
    form.setFieldsValue({hired: e.target.checked});
  }

  useEffect(() => {
    if (selectedItemId) {
      getEmployeeById(selectedItemId).then((employee) => {
        form.setFieldsValue(employee);
      })
    }
  }, [selectedItemId, getEmployeeById]);

  return (
    <Drawer
      title="Редактирование сотрудника"
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
                updateItem(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          }} type="primary" htmlType="submit">
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
          name="firstName"
          rules={[{required: true, message: 'введите имя'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{required: true, message: 'введите фамилию'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="phone"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Ставка"
          name="salaryRate"
          rules={[{
            type: 'number',
            message: 'напишите ставку цифрами больше 1',
            warningOnly: true,
            // pattern: /[1-9]/,
          }]}
        >
          <InputNumber/>
        </Form.Item>
        <Form.Item
          name="hired"
          valuePropName='checked'
          wrapperCol={{offset: 8, span: 16}}>
          <Checkbox
            onChange={onChangeCheckbox}
          >Нанят</Checkbox>
        </Form.Item>
      </Form>
    </Drawer>
  )
}