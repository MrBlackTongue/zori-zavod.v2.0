import React from 'react';
import { Form, Input, Select, Tooltip } from 'antd';
import { FormProductProps } from '../../../types';

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
  const { Option } = Select;

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: 30 }}>
      <Form.Item
        label="Название товара"
        name="title"
        rules={[{ required: true, message: 'введите название' }]}>
        <Input placeholder="Название" />
      </Form.Item>
      <Form.Item
        label="Единица измерения"
        name="unit"
        rules={[{ required: true, message: 'выберите ед. изм.' }]}>
        <Select
          showSearch
          allowClear
          placeholder="Выберите единицу измерения"
          onChange={onChangeUnit}
          onClear={onClearUnit}
          filterOption={onSearchUnit}>
          {allUnit && allUnit.length > 0
            ? allUnit.map(unit => (
                <Option key={unit.id} value={unit.id} label={unit.name}>
                  <Tooltip placement="right" title={unit.name}>
                    {unit.name}
                  </Tooltip>
                </Option>
              ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item label="Товарная группа" name="productGroup">
        <Select
          showSearch
          allowClear
          placeholder="Выберите товарную группу"
          onChange={onChangeProductGroup}
          onClear={onClearProductGroup}
          filterOption={onSearchProductGroup}>
          {allProductGroup && allProductGroup.length > 0
            ? allProductGroup.map(productGroup => (
                <Option
                  key={productGroup.id}
                  value={productGroup.id}
                  label={productGroup.title}>
                  <Tooltip placement="right" title={productGroup.title}>
                    {productGroup.title}
                  </Tooltip>
                </Option>
              ))
            : null}
        </Select>
      </Form.Item>
    </Form>
  );
};
