import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Space } from 'antd';
import { FormProps, TypeEmployeeFormValue } from '../../../types';
import { CustomPopover } from '../../../components/CustomPopover/CustomPopover';
// import { InfoCircleOutlined } from '@ant-design/icons';

export const EmployeeFormView: React.FC<FormProps<TypeEmployeeFormValue>> = ({
  form,
  title,
  onFinish,
  onCancel,
}) => {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        style={{ marginTop: 30 }}
        onFinish={onFinish}>
        <Form.Item
          label={
            <>
              Имя
              <CustomPopover
                content={
                  <p style={{ fontSize: '13px', maxWidth: 350 }}>
                    Здесь вы можете написать имя вашего сотрудника
                  </p>
                }
              />
            </>
          }
          name="firstName"
          rules={[{ required: true, message: 'введите имя' }]}>
          <Input placeholder="Иван" />
        </Form.Item>
        <Form.Item
          required
          // tooltip={{
          //   title: 'Tooltip with customize icon',
          //   icon: <InfoCircleOutlined />,
          // }}
          label="Фамилия"
          name="lastName"
          rules={[{ required: true, message: 'введите фамилию' }]}>
          <Input placeholder="Иванов" />
        </Form.Item>
        <Form.Item label="Телефон" name="phone">
          <Input placeholder="+7 999 999 99 99" />
        </Form.Item>
        <Form.Item
          label={
            <>
              Ставка
              <CustomPopover
                content={
                  <p style={{ fontSize: '13px', maxWidth: 350 }}>
                    Здесь вы можете написать ставку в час вашего сотрудника
                  </p>
                }
              />
            </>
          }
          name="salaryRate"
          rules={[
            {
              type: 'number',
              message: 'напишите ставку цифрами больше 1',
              warningOnly: true,
            },
          ]}>
          <InputNumber placeholder="100" style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item
          name="hired"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Нанят</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
            <Button htmlType="button" onClick={onCancel}>
              Отмена
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
