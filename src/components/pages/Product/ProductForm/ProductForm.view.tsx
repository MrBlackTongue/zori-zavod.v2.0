import React from 'react';
import { Form, Input } from 'antd';
import { FormViewProps, TypeProduct } from '../../../../types';
import { getAllCategory, getAllUnit } from '../../../../api';
import { SimpleSelect } from '../../../atoms/SimpleSelect/SimpleSelect';
import FormActions from '../../../atoms/FormActions/FormActions';

export const ProductFormView: React.FC<FormViewProps<TypeProduct>> = ({
  form,
  title,
  onFinish,
  onCancel,
}) => {
  return (
    <div className="page-form-style">
      <h2 className="center-text">{title}</h2>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: 30 }}
        onFinish={onFinish}>
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
          <SimpleSelect
            form={form}
            fieldName="unit"
            placeholder="Выберите единицу измерения"
            value={form.getFieldValue('unit')}
            getId={item => item.id ?? 0}
            getLabel={item => item.name ?? ''}
            fetchDataList={getAllUnit}
          />
        </Form.Item>
        <Form.Item label="Категория" name="category">
          <SimpleSelect
            form={form}
            fieldName="category"
            placeholder="Выберите категорию"
            value={form.getFieldValue('category')}
            getId={item => item.id ?? 0}
            getLabel={item => item.title ?? ''}
            fetchDataList={getAllCategory}
          />
        </Form.Item>
        <FormActions onCancel={onCancel} />
      </Form>
    </div>
  );
};
