import React from 'react';
import { Col, DatePicker, Flex, Form, Input, Row, Typography } from 'antd';
import { FormViewProps, TypeProductionType } from '../../../../types';
import { CloseOutlined } from '@ant-design/icons';

export const StockAdjustmentFormView: React.FC<
  FormViewProps<TypeProductionType>
> = ({ form, onBlur, onCancel, initialValues }) => {
  return (
    <div className="form-style">
      <Flex justify="space-between">
        <Typography.Title level={4}>
          {Form.useWatch('title', form)}
        </Typography.Title>
        <CloseOutlined onClick={onCancel} style={{ cursor: 'pointer' }} />{' '}
      </Flex>
      <Form form={form} layout="vertical" initialValues={initialValues}>
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
                onBlur={() => onBlur && onBlur('title')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Дата" name="date">
              <DatePicker
                style={{ width: '100%' }}
                format={'DD.MM.YYYY'}
                onBlur={() => onBlur && onBlur('date')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Причина" name="reason">
              <Input onBlur={() => onBlur && onBlur('reason')} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
