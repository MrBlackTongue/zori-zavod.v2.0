import React, { useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { getAllCategory, getAllUnit } from '../../../../api';
import { SimpleSelect } from '../../../atoms/SimpleSelect/SimpleSelect';
import { TypeCategory, TypeItemAttribute, TypeUnit } from '../../../../types';
import { ItemAttributeForm } from './ItemAttributeForm';
import { FormModal } from '../../../atoms/FormModal/FormModal';

interface ProductFormProps {
  form: any;
  onBlur?: () => void;
  onTitleChange: (title: string) => void;
  actions?: {
    onCreateNewUnit?: (value: string) => Promise<TypeUnit>;
    onCreateNewCategory?: (value: string) => Promise<TypeCategory>;
  };
}

export const ProductForm: React.FC<ProductFormProps> = ({
  form,
  onBlur,
  onTitleChange,
  actions,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = (values: TypeItemAttribute) => {
    // Обработка отправки формы
    console.log(values);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  return (
    <Form form={form} layout="vertical" className="form-with-menu">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label="Название товара"
            name="title"
            rules={[{ required: true, message: 'введите название товара' }]}>
            <Input
              placeholder="Название"
              onBlur={onBlur}
              onPressEnter={onBlur}
              onChange={event => onTitleChange(event.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Единица измерения" name="unit">
            <SimpleSelect
              form={form}
              onBlur={onBlur}
              fieldName="unit"
              placeholder="Выберите единицу измерения"
              value={form.getFieldValue('unit')}
              getId={item => item.id ?? 0}
              getLabel={item => item.name ?? ''}
              fetchDataList={getAllUnit}
              onCreateNew={actions?.onCreateNewUnit}
              disabled={!form.getFieldValue('title')}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Категория" name="category">
            <SimpleSelect
              form={form}
              onBlur={onBlur}
              fieldName="category"
              placeholder="Выберите категорию"
              value={form.getFieldValue('category')}
              getId={item => item.id ?? 0}
              getLabel={item => item.title ?? ''}
              fetchDataList={getAllCategory}
              onCreateNew={actions?.onCreateNewCategory}
              disabled={!form.getFieldValue('title')}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Варианты">
            <Button onClick={openModal}>Открыть конфигурацию...</Button>
            <FormModal
              width={'700px'}
              isOpen={isModalVisible}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              renderForm={form => <ItemAttributeForm form={form} />}
              title="Атрибуты элемента"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
