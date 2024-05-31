import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { getAllUnit } from '../../../../api';
import { SimpleSelect } from '../../../atoms/SimpleSelect/SimpleSelect';

interface ItemAttributeFormProps {
  form: any;
}

export const ItemAttributeForm: React.FC<ItemAttributeFormProps> = ({
  form,
}) => {
  return (
    <Form form={form} layout="vertical" className="form-with-menu">
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="Название товара"
            name="title"
            rules={[{ required: true, message: 'введите название товара' }]}>
            <Input placeholder="Название" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Единица измерения" name="unit">
            <SimpleSelect
              form={form}
              fieldName="unit"
              placeholder="Выберите единицу измерения"
              value={form.getFieldValue('unit')}
              getId={item => item.id ?? 0}
              getLabel={item => item.name ?? ''}
              fetchDataList={getAllUnit}
              disabled={!form.getFieldValue('title')}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
