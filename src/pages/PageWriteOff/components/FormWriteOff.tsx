import React from 'react';
import { Form, Input, Select, Tooltip } from 'antd';
import { FormWriteOffProps } from '../../../types';

export const FormWriteOff: React.FC<FormWriteOffProps> = ({
  form,
  allEmployee,
  onChangeEmployee,
  onClearEmployee,
  onSearchEmployee,
  allProductionType,
  onChangeProductionType,
  onClearProductionType,
  onSearchProductionType,
}) => {
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
                <Select.Option
                  key={employee.id}
                  value={employee.id}
                  label={`${employee.lastName}, ${employee.firstName}`}>
                  <Tooltip
                    placement="right"
                    title={`${employee.lastName} ${employee.firstName}`}>
                    {`${employee.lastName} ${employee.firstName}`}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Тип производства"
        name="productionType"
        rules={[{ required: true, message: 'выберите тип' }]}>
        <Select
          showSearch
          allowClear
          placeholder="Выберите тип производства"
          onChange={onChangeProductionType}
          onClear={onClearProductionType}
          filterOption={onSearchProductionType}>
          {allProductionType && allProductionType.length > 0
            ? allProductionType.map(productionType => (
                <Select.Option
                  key={productionType.id}
                  value={productionType.id}
                  label={productionType.title}>
                  <Tooltip placement="right" title={productionType.title}>
                    {productionType.title}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item label="Описание" name="description">
        <Input />
      </Form.Item>
    </Form>
  );
};
