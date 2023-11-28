import React from 'react';
import { Checkbox, DatePicker, Form, InputNumber } from 'antd';
import { FormViewProps, TypePurchaseFormValue } from '../../../../types';
import { numberFormatter, numberParser } from '../../../../utils';
import FormActions from '../../../atoms/FormActions/FormActions';
import { ProductSelect } from '../../../atoms/ProductSelect/ProductSelect';
import { useTransformedSelect } from '../../../../hooks';

export const PurchaseFormView: React.FC<
  FormViewProps<TypePurchaseFormValue>
> = ({ form, title, onFinish, onCancel }) => {
  const { onChange, onClear, onSearch } = useTransformedSelect(form, 'product');

  return (
    <div className="form-style">
      <h2 className="center-text">{title}</h2>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: 30 }}
        onFinish={onFinish}>
        <Form.Item
          label="Товар"
          name="product"
          rules={[{ required: true, message: 'выберите товар' }]}>
          <ProductSelect
            value={form.getFieldValue('product')}
            onChange={onChange}
            onClear={onClear}
            onSearch={onSearch}
          />
        </Form.Item>
        <Form.Item
          label="Цена"
          name="cost"
          rules={[{ required: true, message: 'введите цену' }]}>
          <InputNumber placeholder="100" style={{ width: '100%' }} min={0} />
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
