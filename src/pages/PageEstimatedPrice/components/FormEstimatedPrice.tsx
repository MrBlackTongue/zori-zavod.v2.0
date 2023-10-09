import React from 'react';
import { DatePicker, Form, InputNumber, Select, Tooltip } from 'antd';
import { FormEstimatedPriceProps } from '../../../types';
import { numberFormatter, numberParser } from '../../../utils';

export const FormEstimatedPrice: React.FC<FormEstimatedPriceProps> = ({
  form,
  allProduct,
  onChangeProduct,
  onClearProduct,
  onSearchProduct,
}) => {
  const { Option } = Select;

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: 30 }}>
      <Form.Item
        label="Товар"
        name="product"
        rules={[{ required: true, message: 'Выберите товар' }]}>
        <Select
          showSearch
          allowClear
          placeholder="Выберите товар"
          onChange={onChangeProduct}
          onClear={onClearProduct}
          filterOption={onSearchProduct}>
          {allProduct && allProduct.length > 0
            ? allProduct.map(product => (
                <Option
                  key={product.id}
                  value={product.id}
                  label={product.title}>
                  <Tooltip placement="right" title={product.title}>
                    {product.title}
                  </Tooltip>
                </Option>
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
