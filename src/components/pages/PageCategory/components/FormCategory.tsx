import React from 'react';
import { Form, Input, Select, Tooltip } from 'antd';
import { FormCategoryProps } from '../../../../types';

export const FormCategory: React.FC<FormCategoryProps> = ({
  form,
  allCategory,
  onChangeCategory,
  onClearCategory,
  onSearchCategory,
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
        rules={[{ required: true, message: 'введите название категории' }]}>
        <Input placeholder="Название" />
      </Form.Item>
      <Form.Item label="Родительская категория" name="parent">
        <Select
          showSearch
          allowClear
          placeholder="Выберите родительскую категорию"
          onChange={onChangeCategory}
          onClear={onClearCategory}
          filterOption={onSearchCategory}>
          {allCategory && allCategory.length > 0
            ? allCategory.map(category => (
                <Select.Option
                  key={category.id}
                  value={category.id}
                  label={category.title}>
                  <Tooltip placement="right" title={category.title}>
                    {category.title}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
    </Form>
  );
};
