import React from 'react';
import { Form, Input, Select, Tooltip } from 'antd';
import { FormMeterProps } from '../../../types';

export const FormMeter: React.FC<FormMeterProps> = ({
  form,
  allMeterType,
  onChangeMeterType,
  onClearMeterType,
  onSearchMeterType,
}) => {
  const { Option } = Select;

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: 30 }}>
      <Form.Item
        label="Название"
        name="title"
        rules={[{ required: true, message: 'введите описание' }]}>
        <Input placeholder="Название" />
      </Form.Item>
      <Form.Item
        label="Тип счетчика"
        name="meterType"
        rules={[{ required: true, message: 'выберите счетчик' }]}>
        <Select
          showSearch
          allowClear
          placeholder="Выберите тип счетчика"
          onChange={onChangeMeterType}
          onClear={onClearMeterType}
          filterOption={onSearchMeterType}>
          {allMeterType && allMeterType.length > 0
            ? allMeterType.map(meterType => (
                <Option
                  key={meterType.id}
                  value={meterType.id}
                  label={meterType.title}>
                  <Tooltip placement="right" title={meterType.title}>
                    {meterType.title}
                  </Tooltip>
                </Option>
              ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Серийный номер"
        name="serialNumber"
        rules={[{ required: true, message: 'введите серийный номер' }]}>
        <Input placeholder="Серийный номер счетчика" />
      </Form.Item>
    </Form>
  );
};
