import React from 'react';
import { Form, Input, Select, Tooltip } from 'antd';
import { FormCategoryProps } from '../../../../types';

export const FormCategory: React.FC<FormCategoryProps> = ({
  form,
  allProductGroup,
  onChangeProductGroup,
  onClearProductGroup,
  onSearchProductGroup,
}) => {
  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: 30 }}>
      <Form.Item
        label="Название"
        name="title"
        rules={[
          { required: true, message: 'введите название группы товаров' },
        ]}>
        <Input placeholder="Название" />
      </Form.Item>
      <Form.Item label="Родительская группа" name="parent">
        <Select
          showSearch
          allowClear
          placeholder="Выберите родительскую группу"
          onChange={onChangeProductGroup}
          onClear={onClearProductGroup}
          filterOption={onSearchProductGroup}>
          {allProductGroup && allProductGroup.length > 0
            ? allProductGroup.map(productGroup => (
                <Select.Option
                  key={productGroup.id}
                  value={productGroup.id}
                  label={productGroup.title}>
                  <Tooltip placement="right" title={productGroup.title}>
                    {productGroup.title}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
    </Form>
  );
};
