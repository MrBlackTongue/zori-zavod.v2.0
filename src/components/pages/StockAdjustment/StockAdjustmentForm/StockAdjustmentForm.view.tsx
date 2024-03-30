import React from 'react';
import { Col, DatePicker, Flex, Form, Input, Row } from 'antd';
import { FormViewProps, TypeProductionType } from '../../../../types';
import { CloseOutlined } from '@ant-design/icons';
import { ProductMovementTable } from '../ProductMovementTable';

export const StockAdjustmentFormView: React.FC<
  FormViewProps<TypeProductionType>
> = ({ form, onBlur, onCancel, initialValues }) => {
  return (
    <div className="page-form-style">
      <Flex
        justify="space-between"
        style={{
          borderBottom: '5px solid rgba(22, 119, 255, 0.5)',
          marginBottom: 10,
        }}>
        <div>
          Корректировка
          <div
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {Form.useWatch('title', form)}
          </div>
        </div>
        <CloseOutlined onClick={onCancel} className="close-icon-hover" />{' '}
      </Flex>
      <Form
        form={form}
        layout="vertical"
        className="form-style"
        initialValues={initialValues}>
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
                onBlur={onBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Дата" name="date">
              <DatePicker
                style={{ width: '100%' }}
                format={'DD.MM.YYYY'}
                onBlur={onBlur}
                disabled={!form.getFieldValue('title')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Причина" name="reason">
              <Input onBlur={onBlur} disabled={!form.getFieldValue('title')} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/*<ProductMovementTableContainer />*/}
      <ProductMovementTable />
    </div>
  );
};
