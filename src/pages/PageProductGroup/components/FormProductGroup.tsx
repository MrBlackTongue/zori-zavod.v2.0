import React from 'react';
import {Form, Input, Select, Tooltip} from "antd";
import {FormProductGroupProps} from "../../../types";

export const FormProductGroup: React.FC<FormProductGroupProps> = ({
                                                                    form,
                                                                    allProductGroup,
                                                                    onChangeProductGroup,
                                                                    onClearProductGroup,
                                                                    onSearchProductGroup,
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
        label="Название"
        name="title"
        rules={[{required: true, message: "введите название группы товаров"}]}
      >
        <Input placeholder='Название'/>
      </Form.Item>
      <Form.Item
        label="Родительская группа"
        name="parent">
        <Select
          showSearch
          allowClear
          placeholder="Выберите родительскую группу"
          onChange={onChangeProductGroup}
          onClear={onClearProductGroup}
          filterOption={onSearchProductGroup}
        >
          {allProductGroup && allProductGroup.length > 0 ?
            allProductGroup
              .map(productGroup => (
              <Option key={productGroup.id} value={productGroup.id} label={productGroup.title}>
                <Tooltip placement="right" title={productGroup.title}>
                  {productGroup.title}
                </Tooltip>
              </Option>
            )) : null}
        </Select>
      </Form.Item>
    </Form>
  );
}
