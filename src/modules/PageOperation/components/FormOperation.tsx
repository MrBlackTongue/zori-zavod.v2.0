import React from 'react';
import { Form, Input, InputNumber, Select, Tooltip } from 'antd';
import { FormOperationProps } from '../../../types';

export const FormOperation: React.FC<FormOperationProps> = ({
  form,
  allUnit,
  onChangeUnit,
  onClearUnit,
  onSearchUnit,
}) => {
  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: 30 }}>
      <Form.Item
        label="Название операции"
        name="title"
        rules={[{ required: true, message: 'введите название' }]}>
        <Input placeholder="Название" />
      </Form.Item>
      <Form.Item label="Единица измерения" name="unit">
        <Select
          showSearch
          allowClear
          placeholder="Выберите единицу измерения"
          onChange={onChangeUnit}
          onClear={onClearUnit}
          filterOption={onSearchUnit}>
          {allUnit && allUnit.length > 0
            ? allUnit.map(unit => (
                <Select.Option key={unit.id} value={unit.id} label={unit.name}>
                  <Tooltip placement="right" title={unit.name}>
                    {unit.name}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Норма"
        name="rate"
        rules={[
          {
            type: 'number',
            message: 'напишите норму цифрами больше 1',
            warningOnly: true,
          },
        ]}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>
    </Form>
  );
};
