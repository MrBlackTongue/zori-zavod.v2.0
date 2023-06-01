import React from 'react';
import {Form, Input, Select} from "antd";
import {FormProductProps} from "../../../types";

const {Option} = Select;

export const FormProduct: React.FC<FormProductProps> = ({
                                                          form,
                                                          allUnit,
                                                          onChangeUnit,
                                                          onClearUnit,
                                                          onSearchUnit,
                                                          allProductGroup,
                                                          onChangeProductGroup,
                                                          onClearProductGroup,
                                                          onSearchProductGroup,
                                                        }) => {
  return (
    <Form
      form={form}
      labelCol={{span: 6}}
      wrapperCol={{span: 16}}
      style={{marginTop: 30}}
    >
      <Form.Item
        label="Название товара"
        name="title"
        rules={[{required: true, message: 'введите название'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Единица измерения"
        name="unit"
        rules={[{required: true, message: 'выберите ед. изм.'}]}
      >
        <Select
          showSearch
          allowClear
          onChange={onChangeUnit}
          onClear={onClearUnit}
          filterOption={onSearchUnit}
        >
          {allUnit && allUnit.length > 0 ?
            allUnit.map(unit => (
              <Option key={unit.id} value={unit.id} label={unit.name}>
                {unit.name}
              </Option>
            )) : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Товарная группа"
        name="productGroup"
        rules={[{required: true, message: 'выберите тов. группу'}]}
      >
        <Select
          showSearch
          allowClear
          onChange={onChangeProductGroup}
          onClear={onClearProductGroup}
          filterOption={onSearchProductGroup}
        >
          {allProductGroup && allProductGroup.length > 0 ?
            allProductGroup.map(productGroup => (
              <Option key={productGroup.id} value={productGroup.id} label={productGroup.title}>
                {productGroup.title}
              </Option>
            )) : null}
        </Select>
      </Form.Item>
    </Form>
  );
}
