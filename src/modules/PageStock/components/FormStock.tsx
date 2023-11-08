import React from 'react';
import { Form, Select, Tooltip } from 'antd';
import { FormStockProps } from '../../../types';

export const FormStock: React.FC<FormStockProps> = ({
  form,
  allProduct,
  onChangeProduct,
  onClearProduct,
  onSearchProduct,
  allStoragePlace,
  onChangeStoragePlace,
  onClearStoragePlace,
  onSearchStoragePlace,
}) => {
  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: 30 }}>
      <Form.Item
        label="Товар"
        name="product"
        rules={[{ required: true, message: 'выберите товар' }]}>
        <Select
          showSearch
          allowClear
          placeholder="Выберите товар"
          onChange={onChangeProduct}
          onClear={onClearProduct}
          filterOption={onSearchProduct}>
          {allProduct && allProduct.length > 0
            ? allProduct.map(product => (
                <Select.Option
                  key={product.id}
                  value={product.id}
                  label={product.title}>
                  <Tooltip placement="right" title={product.title}>
                    {product.title}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item label="Место хранения" name="storagePlace">
        <Select
          showSearch
          allowClear
          placeholder="Выберите место"
          onChange={onChangeStoragePlace}
          onClear={onClearStoragePlace}
          filterOption={onSearchStoragePlace}>
          {allStoragePlace && allStoragePlace.length > 0
            ? allStoragePlace.map(storagePlace => (
                <Select.Option
                  key={storagePlace.id}
                  value={storagePlace.id}
                  label={storagePlace.title}>
                  <Tooltip placement="right" title={storagePlace.title}>
                    {storagePlace.title}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
    </Form>
  );
};
