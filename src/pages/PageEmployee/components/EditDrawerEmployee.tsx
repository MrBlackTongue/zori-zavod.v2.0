import React, {useEffect} from "react";
import {Button, Checkbox, Drawer, Form, Input, InputNumber, Space} from "antd";
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

  // Изменить состояние чекбокса
  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    form.setFieldsValue({hired: e.target.checked});
  }

  // Функция подтверждения редактирования
  const handleOk = () => {
    closeDrawer()
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      })
  }

  useEffect(() => {
    if (selectedItemId) {
      getEmployeeById(selectedItemId).then((employee) => {
        form.setFieldsValue(employee);
      })
    }
  }, [selectedItemId]);

  return (
    <Drawer
      title="Редактирование сотрудника"
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
          }]}
        >
          <InputNumber style={{width: '100%'}}/>
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