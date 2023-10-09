import React from 'react';
import {Form, InputNumber, Select, Tooltip} from "antd";
import {FormProductBatchProps} from "../../../types";
import {numberFormatter, numberParser} from "../../../utils";

export const FormProductBatch: React.FC<FormProductBatchProps> = ({
                                                                    form,
                                                                    allProduct,
                                                                    onChangeProduct,
                                                                    onClearProduct,
                                                                    onSearchProduct,
                                                                  }) => {
  const {Option} = Select;

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
                <Tooltip placement="right" title={product.title}>
                  {product.title}
                </Tooltip>
              </Option>
            )) : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Количество"
        name="amount"
        rules={[{required: true, message: 'введите количество'}]}
      >
        <InputNumber
          placeholder='1'
          style={{width: "100%"}}
          min={1}
          formatter={numberFormatter}
          parser={numberParser}
        />
      </Form.Item>
    </Form>
  );
}
