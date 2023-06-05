import React from 'react';
import {DatePicker, Form, Select} from "antd";
import {FormOutputProps} from "../../../types";

const {Option} = Select;

export const FormOutput: React.FC<FormOutputProps> = ({
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
        label="Дата"
        name="date"
        rules={[{required: true, message: 'выберите дату'}]}
      >
        <DatePicker
          style={{width: '100%'}}
          format={'DD.MM.YYYY'}
        />
      </Form.Item>
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
    </Form>
  );
}