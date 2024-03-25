import React from 'react';
import { Col, DatePicker, Form, Input, Row, Typography } from 'antd';
import { FormViewProps, TypeProductionType } from '../../../../types';

export const StockAdjustmentFormView: React.FC<
  FormViewProps<TypeProductionType>
> = ({ form, onBlur }) => {
  return (
    <div className="form-style">
      <Typography.Title level={4}>
        {Form.useWatch('title', form)}
      </Typography.Title>
      <Form form={form} layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Название"
              name="title"
              rules={[
                { required: true, message: 'введите название корректировки' },
              ]}>
              <Input
                placeholder="Введите название корректировки"
                onBlur={() => (onBlur ? onBlur('title') : null)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Дата" name="date">
              <DatePicker
                style={{ width: '100%' }}
                format={'DD.MM.YYYY'}
                onBlur={() => (onBlur ? onBlur('date') : null)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Причина" name="reason">
              <Input onBlur={() => (onBlur ? onBlur('reason') : null)} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
