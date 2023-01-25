import {Button, Checkbox, Drawer, Form, Input, InputNumber, Space} from "antd";
import React, {useEffect, useState} from "react";
import {EditEmployeeProps, EmployeeType} from "../../../types/employeeType";
import {getEmployeeById} from "../../../requests/employeesRequests";
import {log} from "util";
import {CheckboxChangeEvent} from "antd/es/checkbox";


export const EditEmployee: React.FC<EditEmployeeProps> = ({
                                                            isOpen,
                                                            selectedEmployeeId,
                                                            closeDrawer,
                                                            onFinish,
                                                            onFinishFailed
                                                          }) => {
  const [form] = Form.useForm();

  const [employee, setEmployee] = useState<EmployeeType | null>(null);

  const [hired, setHired] = useState(employee?.hired)

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    setHired(e.target.checked);
    form.setFieldsValue({hired: e.target.checked});
    console.log(`checked = ${e.target.checked}`);
  }

  useEffect(() => {
    if (selectedEmployeeId) {
      getEmployeeById(selectedEmployeeId).then((employee) => {
        form.setFieldsValue(employee);
      })
    }
  }, [selectedEmployeeId, getEmployeeById]);

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
            form.validateFields()
              .then((values) => {
                // form.resetFields()
                onFinish(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
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
          valuePropName='checked'
          wrapperCol={{offset: 8, span: 16}}>
          <Checkbox
            // checked={employee?.hired}
            onChange={onChangeCheckbox}
            // onChange={() => setHired(hired)}
          >Нанят</Checkbox>
        </Form.Item>
        <Form.Item
        name='id'>
        </Form.Item>
      </Form>
    </Drawer>
  )
}