import React from 'react';
import {Form, InputNumber, Select} from "antd";
import {FormStockProps} from "../../../types";

const {Option} = Select;

export const FormStock: React.FC<FormStockProps> = ({
                                                      form,
                                                      allProduct,
                                                      onChangeProduct,
                                                      onClearProduct,
                                                      onSearchProduct,
                                                    }) => {
  return (
    <Form
      form={form}
      labelCol={{span: 6}}
      wrapperCol={{span: 16}}
      style={{marginTop: 30}}
    >
      <Form.Item
        label="Товар"
        name="product"
        rules={[{required: true, message: 'выберите товар'}]}
      >
        <Select
          showSearch
          allowClear
          placeholder='Выберите товар'
          onChange={onChangeProduct}
          onClear={onClearProduct}
          filterOption={onSearchProduct}
        >
          {allProduct && allProduct.length > 0 ?
            allProduct.map(product => (
              <Option key={product.id} value={product.id} label={product.title}>
                {product.title}
              </Option>
            )) : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Количество"
        name="amount"
        rules={[{required: true, message: "введите количество"}]}
      >
        <InputNumber placeholder='1' style={{width: "100%"}} min={0}/>
      </Form.Item>
    </Form>
  );
}
