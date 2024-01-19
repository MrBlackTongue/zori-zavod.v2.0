import React from 'react';
import { Form, Input, Select } from 'antd';
import {
  FormProps,
  TypeMaterialCategory,
  TypeMaterialFormValue,
  TypeUnit,
} from '../../../../types';
import FormActions from '../../../atoms/FormActions/FormActions';

const { Option } = Select;

export const MaterialFormView: React.FC<
  FormProps<TypeMaterialFormValue> & {
    allCategories: TypeMaterialCategory[];
    allUnits: TypeUnit[];
  }
> = ({ form, title, onFinish, onCancel, allCategories, allUnits }) => {
  return (
    <div className="form-style">
      <h2 className="center-text">{title}</h2>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        style={{ marginTop: 30 }}
        onFinish={onFinish}>
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: 'Введите название материала' }]}>
          <Input placeholder="Введите название" />
        </Form.Item>
        <Form.Item
          label="Код"
          name="code"
          rules={[{ required: true, message: 'Введите код материала' }]}>
          <Input placeholder="Введите код" />
        </Form.Item>
        <Form.Item
          label="Категория"
          name="category"
          rules={[{ required: true, message: 'Выберите категорию' }]}>
          <Select placeholder="Выберите категорию" allowClear>
            {allCategories.map(category => (
              <Option key={category.id} value={category.id}>
                {category.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Единица измерения"
          name="unit"
          rules={[{ required: true, message: 'Выберите единицу измерения' }]}>
          <Select placeholder="Выберите единицу" allowClear>
            {allUnits.map(unit => (
              <Option key={unit.id} value={unit.id}>
                {unit.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <FormActions onCancel={onCancel} />
      </Form>
    </div>
  );
};
