import React, { useCallback, useEffect } from 'react';
import { Button, Col, Flex, Form, Input, Row, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  TypeItemAttribute,
  TypeItemAttributeValue,
} from '../../../../../types';
import { DefaultOptionType } from 'antd/lib/select';
import { FormInstance } from 'antd/lib/form';

interface ItemAttributeFormProps {
  attributeForm: FormInstance;
  initialValues?: { attributes: TypeItemAttribute[] };
}

export const ItemAttributeForm: React.FC<ItemAttributeFormProps> = ({
  attributeForm,
  initialValues,
}) => {
  const handleChange = useCallback(
    (
      selectedValues: string[],
      options: DefaultOptionType | DefaultOptionType[],
      fieldKey: number,
    ) => {
      attributeForm.setFieldsValue({
        attributes: attributeForm
          .getFieldValue('attributes')
          .map((attribute: TypeItemAttribute, index: number) =>
            index === fieldKey
              ? {
                  ...attribute,
                  values: selectedValues.map((value, i) => {
                    const option = Array.isArray(options)
                      ? options[i]
                      : options;
                    return {
                      ...(option.key && { id: option.key }),
                      value,
                      attributeId: attribute.id,
                    };
                  }),
                }
              : attribute,
          ),
      });
    },
    [attributeForm],
  );

  const handleRemove = useCallback(
    (
      fields: any[],
      name: number,
      remove: (index: number | number[]) => void,
    ) => {
      remove(name);
      if (fields.length === 1) {
        attributeForm.setFieldsValue({ attributes: [{}] });
      }
    },
    [attributeForm],
  );

  useEffect(() => {
    const formInitialValues =
      initialValues && initialValues.attributes.length > 0
        ? initialValues
        : { attributes: [{}] };
    attributeForm.setFieldsValue(formInitialValues);
  }, [attributeForm, initialValues]);

  return (
    <Form form={attributeForm} layout="vertical" className="form-with-menu">
      <Flex
        align="center"
        style={{ marginBottom: '10px', marginLeft: '10px', marginTop: '30px' }}>
        <div style={{ marginRight: '110px' }}>Атрибут</div>
        <div>Значения атрибута</div>
      </Flex>
      <Form.List name="attributes">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
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
                      onChange={(values, options) =>
                        handleChange(values, options, index)
                      }
                      options={attributeForm
                        .getFieldValue(['attributes', name, 'values'])
                        ?.map((item: TypeItemAttributeValue) => ({
                          key: item.id,
                          value: item.value,
                        }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button
                    type={'text'}
                    shape="circle"
                    size={'large'}
                    onClick={() => handleRemove(fields, name, remove)}>
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
