import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { Value } from '../../../../types';

interface ItemAttributeFormProps {
  form: any;
}

export const ItemAttributeForm: React.FC<ItemAttributeFormProps> = ({
  form,
}) => {
  const handleChange = (values: string[]) => {
    form.setFieldsValue({
      values: values.map((value, index) => ({ id: index, value })),
    });
  };

  return (
    <Form form={form} layout="vertical" className="form-with-menu">
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="Атрибут" name="title">
            <Input placeholder="Например, цвет" />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item label="Значения атрибута" name="values">
            <Select
              mode="tags"
              open={false}
              style={{ width: '100%' }}
              placeholder="Например, красный, зеленый, синий"
              onChange={handleChange}
              tokenSeparators={[',']}
              value={form
                .getFieldValue('values')
                ?.map((item: Value) => item.value)}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
