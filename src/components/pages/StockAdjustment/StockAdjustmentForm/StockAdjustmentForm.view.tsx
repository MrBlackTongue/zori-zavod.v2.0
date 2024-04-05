import React from 'react';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import { FormViewProps, TypeProductionType } from '../../../../types';
import { ProductMovementTableContainer } from '../ProductMovementTable/ProductMovementTable.container';
import { useLoadingAndSaving } from '../../../../contexts/LoadingAndSavingContext';
import { FormHeader } from '../../../atoms/FormHeader/FormHeader';

export const StockAdjustmentFormView: React.FC<
  FormViewProps<TypeProductionType>
> = ({ form, onBlur, onCancel, initialValues }) => {
  const { isSaving } = useLoadingAndSaving();

  return (
    <div className="page-form-style">
      <FormHeader
        header="Корректировка"
        title={Form.useWatch('title', form)}
        isSaving={isSaving}
        onCancel={onCancel}
      />
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
      <ProductMovementTableContainer />
    </div>
  );
};
