import React from 'react';
import { Form, InputNumber, Select, Tooltip } from 'antd';
import { FormOperationTimesheetProps } from '../../../types';

export const FormOperationTimesheet: React.FC<FormOperationTimesheetProps> = ({
  form,
  allEmployee,
  onChangeEmployee,
  onClearEmployee,
  onSearchEmployee,
}) => {
  const { Option } = Select;

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: 30 }}>
      <Form.Item
        label="Сотрудник"
        name="employee"
        rules={[{ required: true, message: 'выберите сотрудника' }]}>
        <Select
          showSearch
          allowClear
          placeholder="Выберите сотрудника"
          onChange={onChangeEmployee}
          onClear={onClearEmployee}
          filterOption={onSearchEmployee}>
          {allEmployee && allEmployee.length > 0
            ? allEmployee.map(employee => (
                <Option
                  key={employee.id}
                  value={employee.id}
                  label={`${employee.lastName}, ${employee.firstName}`}>
                  <Tooltip
                    placement="right"
                    title={`${employee.lastName} ${employee.firstName}`}>
                    {`${employee.lastName} ${employee.firstName}`}
                  </Tooltip>
                </Option>
              ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item label="Результат" name="fact">
        <InputNumber placeholder="1" style={{ width: '100%' }} min={0} />
      </Form.Item>
      <Form.Item
        label="Часы"
        name="hours"
        rules={[
          { required: true, message: 'напишите часы' },
          { type: 'number', min: 0.1, message: 'часы должны быть больше 0,1' },
        ]}>
        <InputNumber
          style={{ width: '100%' }}
          placeholder="1"
          min={0.1}
          formatter={value => `${value}`.replace('.', ',')}
          parser={(displayValue: string | undefined): number => {
            if (displayValue === undefined) return 0;
            return parseFloat(displayValue.replace(',', '.'));
          }}
        />
      </Form.Item>
    </Form>
  );
};
