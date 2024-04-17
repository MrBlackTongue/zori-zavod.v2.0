import React from 'react';
import { Checkbox, DatePicker, Form, InputNumber } from 'antd';
import { FormViewProps, TypePurchase } from '../../../../types';
import { numberFormatter, numberParser } from '../../../../utils';
import FormActions from '../../../atoms/FormActions/FormActions';
import { SimpleSelect } from '../../../atoms/SimpleSelect/SimpleSelect';
import { getAllProduct } from '../../../../api';

export const PurchaseFormView: React.FC<FormViewProps<TypePurchase>> = ({
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
          label="Товар"
          name="item"
          rules={[{ required: true, message: 'выберите товар' }]}>
          <SimpleSelect
            form={form}
            fieldName="item"
            placeholder="Выберите товар"
            value={form.getFieldValue('item')}
            getId={item => item.id ?? 0}
            getLabel={item => item.title ?? ''}
            fetchDataList={getAllProduct}
          />
        </Form.Item>
        <Form.Item
          label="Количество"
          name="amount"
          rules={[{ required: true, message: 'введите количество' }]}>
          <InputNumber
            placeholder="1"
            style={{ width: '100%' }}
            min={1}
            formatter={numberFormatter}
            parser={numberParser}
          />
        </Form.Item>
        <Form.Item
          label="Цена"
          name="cost"
          rules={[{ required: true, message: 'введите цену' }]}>
          <InputNumber placeholder="100" style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item
          label="Дата"
          name="date"
          rules={[{ required: true, message: 'выберите дату' }]}>
          <DatePicker style={{ width: '100%' }} format={'DD.MM.YYYY'} />
        </Form.Item>
        <Form.Item
          name="paid"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Оплачено</Checkbox>
        </Form.Item>
        <FormActions onCancel={onCancel} />
      </Form>
    </div>
  );
};
