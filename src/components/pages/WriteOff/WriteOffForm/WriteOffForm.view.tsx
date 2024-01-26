import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { FormViewProps, TypeProductionType } from '../../../../types';
import FormActions from '../../../atoms/FormActions/FormActions';
import { getAllEmployee, getAllProductionType } from '../../../../api';
import { SimpleSelect } from '../../../atoms/SimpleSelect/SimpleSelect';

export const WriteOffFormView: React.FC<FormViewProps<TypeProductionType>> = ({
  form,
  title,
  onFinish,
  onCancel,
}) => {
  return (
    <div className="form-style">
      <h2>{title}</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Сотрудник"
              name="employee"
              rules={[{ required: true, message: 'выберите сотрудника' }]}>
              <SimpleSelect
                form={form}
                fieldName="employee"
                placeholder="Выберите сотрудника"
                value={form.getFieldValue('employee')}
                getId={item => item.id ?? 0}
                getLabel={item => `${item.lastName} ${item.firstName}` ?? ''}
                fetchDataList={getAllEmployee}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Тип производства"
              name="productionType"
              rules={[{ required: true, message: 'выберите тип' }]}>
              <SimpleSelect
                form={form}
                fieldName="productionType"
                placeholder="Выберите тип производства"
                value={form.getFieldValue('productionType')}
                getId={item => item.id ?? 0}
                getLabel={item => item.title ?? ''}
                fetchDataList={getAllProductionType}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Описание" name="description">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <FormActions onCancel={onCancel} />
      </Form>
    </div>
  );
};
