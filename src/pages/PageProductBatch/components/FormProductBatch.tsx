import React from 'react';
import {Form, InputNumber, Select} from "antd";
import {FormProductBatchProps} from "../../../types";

const {Option} = Select;

export const FormProductBatch: React.FC<FormProductBatchProps> = ({
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
        rules={[{required: true, message: 'введите количество'}]}
      >
        <InputNumber style={{width: "100%"}} min={1}/>
      </Form.Item>
    </Form>
  );
}
