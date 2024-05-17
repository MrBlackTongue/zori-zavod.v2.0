import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { FormViewProps, TypeProduct } from '../../../../types';
import {
  createCategory,
  createUnit,
  getAllCategory,
  getAllUnit,
} from '../../../../api';
import { SimpleSelect } from '../../../atoms/SimpleSelect/SimpleSelect';
import { useLoadingAndSaving } from '../../../../contexts/LoadingAndSavingContext';
import { FormHeader } from '../../../atoms/FormHeader/FormHeader';

export const ProductFormView: React.FC<FormViewProps<TypeProduct>> = ({
  form,
  onBlur,
  onCancel,
}) => {
  const { isSaving } = useLoadingAndSaving();

  return (
    <div className="page-form-style">
      <FormHeader
        header="Товар"
        title={Form.useWatch('title', form)}
        isSaving={isSaving}
        onCancel={onCancel}
      />
      <Form form={form} layout="vertical" className="form-style">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Название товара"
              name="title"
              rules={[{ required: true, message: 'введите название товара' }]}>
              <Input
                placeholder="Название"
                onBlur={onBlur}
                onPressEnter={onBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Единица измерения" name="unit">
              <SimpleSelect
                form={form}
                onBlur={onBlur}
                fieldName="unit"
                placeholder="Выберите единицу измерения"
                value={form.getFieldValue('unit')}
                getId={item => item.id ?? 0}
                getLabel={item => item.name ?? ''}
                fetchDataList={getAllUnit}
                onCreateNew={async (value: string) => {
                  const response = await createUnit({ name: value });
                  return response.data;
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Категория" name="category">
              <SimpleSelect
                form={form}
                onBlur={onBlur}
                fieldName="category"
                placeholder="Выберите категорию"
                value={form.getFieldValue('category')}
                getId={item => item.id ?? 0}
                getLabel={item => item.title ?? ''}
                fetchDataList={getAllCategory}
                onCreateNew={async (value: string) => {
                  const response = await createCategory({ title: value });
                  return response.data;
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
