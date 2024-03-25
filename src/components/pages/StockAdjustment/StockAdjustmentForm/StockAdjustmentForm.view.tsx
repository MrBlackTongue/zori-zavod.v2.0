import React from 'react';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import { FormViewProps, TypeProductionType } from '../../../../types';
import FormActions from '../../../atoms/FormActions/FormActions';

export const StockAdjustmentFormView: React.FC<
  FormViewProps<TypeProductionType>
> = ({ form, title, onFinish, onCancel }) => {
  return (
    <div className="form-style">
      <h2>{title}</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Название"
              name="title"
              rules={[
                { required: true, message: 'введите название корректировки' },
              ]}>
              <Input placeholder="Введите название корректировки" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Дата" name="date">
              <DatePicker style={{ width: '100%' }} format={'DD.MM.YYYY'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Причина" name="reason">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <FormActions onCancel={onCancel} />
      </Form>
    </div>
  );
};
