import React from 'react';
import { Checkbox, Form, Input, InputNumber } from 'antd';
import { FormProps, TypeEmployeeFormValue } from '../../../../types';
import { CustomPopover } from '../../../atoms/CustomPopover/CustomPopover';
import FormActions from '../../../atoms/FormActions/FormActions';

export const EmployeeFormView: React.FC<FormProps<TypeEmployeeFormValue>> = ({
  form,
  title,
  onFinish,
  onCancel,
}) => {
  return (
    <div
      style={{
        minHeight: '70vh',
        backgroundColor: 'white',
        borderRadius: '7px',
        paddingTop: '10px',
      }}>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        style={{ marginTop: 30 }}
        onFinish={onFinish}>
        <Form.Item
          label="Имя"
          name="firstName"
          rules={[{ required: true, message: 'введите имя' }]}>
          <Input placeholder="Иван" />
        </Form.Item>
        <Form.Item
          required
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
        <FormActions onCancel={onCancel} />
      </Form>
    </div>
  );
};
