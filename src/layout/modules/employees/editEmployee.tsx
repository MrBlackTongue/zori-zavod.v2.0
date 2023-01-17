import {Button, Checkbox, Drawer, Form, Input, InputNumber, Space} from "antd";
import React from "react";
import {EditEmployeeProps} from "../../../types/types";


export const EditEmployee: React.FC<EditEmployeeProps> = ({
                                                                onCloseDrawer,
                                                                isDrawerOpen,
                                                                onFinish,
                                                                onFinishFailed
                                                              }) => {
  const [form] = Form.useForm();

  // const [hired, setHired] = useState(employee?.hired)

  return (
    <Drawer
      title="Редактирование сотрудника"
      width={600}
      onClose={onCloseDrawer}
      open={isDrawerOpen}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={onCloseDrawer}>Отмена</Button>
          <Button onClick={() => {
            onCloseDrawer()
            // putChangeEmployee()
          }} type="primary" form='change-worker' htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        id='change-worker'
        form={form}
        // name="change-worker"
        // initialValues={employeeData} // установить инициализационные значения
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Имя"
          name="firstName"
          rules={[{required: true, message: 'Пожалуйста введите имя'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{required: true, message: 'Пожалуйста введите фамилию'}]}
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
            message: 'Пожалуйста напишите ставку цифрами больше 1',
            warningOnly: true,
            // pattern: /[1-9]/,
          }]}
        >
          <InputNumber/>
        </Form.Item>
        <Form.Item
          name="hired"
          wrapperCol={{offset: 8, span: 16}}>
          {/*<Checkbox checked={employee?.hired} onChange={() => setHired(hired)}>Нанят</Checkbox>*/}
        </Form.Item>
      </Form>
    </Drawer>
  )
}