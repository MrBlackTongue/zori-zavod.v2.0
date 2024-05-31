import React from 'react';
import { Button, Col, Flex, Form, Input, Row, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Value } from '../../../../types';

interface ItemAttributeFormProps {
  form: any;
}

export const ItemAttributeForm: React.FC<ItemAttributeFormProps> = ({
  form,
}) => {
  const handleChange = (values: string[], fieldKey: number) => {
    form.setFieldsValue({
      attributes: form
        .getFieldValue('attributes')
        .map((attribute: any, index: number) => {
          if (index === fieldKey) {
            return {
              ...attribute,
              values: values.map((value, index) => ({ id: index, value })),
            };
          }
          return attribute;
        }),
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="form-with-menu"
      initialValues={{ attributes: [{}] }}>
      <Flex align="center" style={{ marginBottom: '10px', marginLeft: '10px' }}>
        <div style={{ marginRight: '110px' }}>Атрибут</div>
        <div>Значения атрибута</div>
      </Flex>
      <Form.List name="attributes">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={16}>
                <Col span={6}>
                  <Form.Item {...restField} name={[name, 'title']}>
                    <Input placeholder="Например, цвет" />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item {...restField} name={[name, 'values']}>
                    <Select
                      mode="tags"
                      open={false}
                      style={{ width: '100%' }}
                      placeholder="Например, красный, зеленый, синий"
                      onChange={values => handleChange(values, name)}
                      tokenSeparators={[',']}
                      value={form
                        .getFieldValue(['attributes', name, 'values'])
                        ?.map((item: Value) => item.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button
                    type={'text'}
                    shape="circle"
                    size={'large'}
                    onClick={() => {
                      if (fields.length > 1) {
                        remove(name);
                      }
                    }}>
                    <DeleteOutlined style={{ fontSize: '18px' }} />
                  </Button>
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Col span={4}>
                <Button
                  type="primary"
                  size="small"
                  shape="circle"
                  onClick={() => add()}>
                  <PlusOutlined />
                </Button>
              </Col>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};
