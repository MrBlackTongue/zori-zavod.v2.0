import React from 'react';
import { DatePicker, Form, InputNumber, Select, Tooltip } from 'antd';
import { FormEstimatedPriceProps } from '../../../../types';
import { numberFormatter, numberParser } from '../../../../utils';

export const FormEstimatedPrice: React.FC<FormEstimatedPriceProps> = ({
  form,
  allItem,
  onChangeItem,
  onClearItem,
  onSearchItem,
}) => {
  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: 30 }}>
      <Form.Item
        label="Товар"
        name="item"
        rules={[{ required: true, message: 'Выберите товар' }]}>
        <Select
          showSearch
          allowClear
          placeholder="Выберите товар"
          onChange={onChangeItem}
          onClear={onClearItem}
          filterOption={onSearchItem}>
          {allItem && allItem.length > 0
            ? allItem.map(item => (
                <Select.Option key={item.id} value={item.id} label={item.title}>
                  <Tooltip placement="right" title={item.title}>
                    {item.title}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Расчетная цена"
        name="price"
        rules={[{ required: true, message: 'Введите расчетную цену' }]}>
        <InputNumber
          placeholder="1"
          style={{ width: '100%' }}
          min={1}
          formatter={numberFormatter}
          parser={numberParser}
        />
      </Form.Item>
      <Form.Item
        label="Дата"
        name="date"
        rules={[{ required: true, message: 'Выберите дату' }]}>
        <DatePicker style={{ width: '100%' }} format={'DD.MM.YYYY'} />
      </Form.Item>
    </Form>
  );
};
