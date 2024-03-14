import React from 'react';
import { Form, Input } from 'antd';
import { FormViewProps, TypeMaterial } from '../../../../types';
import FormActions from '../../../atoms/FormActions/FormActions';
import { getAllCategory, getAllUnit } from '../../../../api';
import { SimpleSelect } from '../../../atoms/SimpleSelect/SimpleSelect';

export const MaterialFormView: React.FC<FormViewProps<TypeMaterial>> = ({
  form,
  title,
  onFinish,
  onCancel,
}) => {
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
          name="title"
          rules={[{ required: true, message: 'Введите название материала' }]}>
          <Input placeholder="Введите название" />
        </Form.Item>
        <Form.Item label="Код" name="code">
          <Input placeholder="Введите код" />
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
        <Form.Item label="Единица измерения" name="unit">
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
        <FormActions onCancel={onCancel} />
      </Form>
    </div>
  );
};
