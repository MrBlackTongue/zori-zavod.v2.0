import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import {
  createItemAttribute,
  deleteItemAttributeById,
  getAllCategory,
  getAllUnit,
  getItemAttributeByIdItem,
  updateItemAttribute,
} from '../../../../../api';
import { SimpleSelect } from '../../../../atoms/SimpleSelect/SimpleSelect';
import {
  TypeCategory,
  TypeItemAttribute,
  TypeUnit,
} from '../../../../../types';
import { ItemAttributeForm } from './ItemAttributeForm';
import { FormModal } from '../../../../atoms/FormModal/FormModal';
import { useParams } from 'react-router-dom';

interface ProductFormProps {
  productForm: any;
  onBlur?: () => void;
  onTitleChange: (title: string) => void;
  actions?: {
    onCreateNewUnit?: (value: string) => Promise<TypeUnit>;
    onCreateNewCategory?: (value: string) => Promise<TypeCategory>;
  };
}

export const MainForm: React.FC<ProductFormProps> = ({
  productForm,
  onBlur,
  onTitleChange,
  actions,
}) => {
  // Преобразование id из пути в число
  const { id: rawId } = useParams<{ id?: string }>();
  const itemId = rawId ? parseInt(rawId, 10) : undefined;
  const [attributeForm] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemAttributes, setItemAttributes] = useState<TypeItemAttribute[]>([]);

  const handleSubmit = async (values: { attributes: TypeItemAttribute[] }) => {
    console.log('Form values:', values);
    if (itemId) {
      try {
        const { attributes } = values;
        console.log('attributes', attributes);

        const newAttributes = attributes.filter(attr => !attr.id);
        console.log('newAttributes', newAttributes);

        const updatedAttributes = attributes.filter(attr => attr.id);
        console.log('updatedAttributes', updatedAttributes);

        const deletedAttributes = itemAttributes.filter(
          attr => !attributes.some(newAttr => newAttr.id === attr.id),
        );
        console.log('deletedAttributes', deletedAttributes);

        // Создание новых атрибутов
        const createPromises = newAttributes.map(attribute =>
          createItemAttribute({
            itemId: itemId,
            title: attribute.title,
            values: attribute.values,
          }),
        );
        await Promise.all(createPromises);

        // Редактирование существующих атрибутов
        const updatePromises = updatedAttributes.map(attribute =>
          updateItemAttribute(attribute),
        );
        await Promise.all(updatePromises);

        // Удаление атрибутов
        const deletePromises = deletedAttributes.map(attribute => {
          if (attribute.id) {
            return deleteItemAttributeById(attribute.id);
          }
        });
        await Promise.all(deletePromises);

        // Обновление состояния itemAttributes после успешного сохранения ?
        // setItemAttributes(attributes);

        setIsModalVisible(false);
      } catch (error) {
        console.error('Ошибка при сохранении атрибутов:', error);
      }
    }
  };

  const fetchItemAttributes = useCallback(async () => {
    if (itemId) {
      try {
        const attributes = await getItemAttributeByIdItem(itemId);
        setItemAttributes(attributes || []);
        attributeForm.setFieldsValue({
          attributes: attributes?.map(attribute => ({
            title: attribute.title,
            values: attribute.values.map(value => value.value),
          })),
        });
      } catch (error) {
        console.error('Ошибка при загрузке атрибутов элемента:', error);
      }
    }
  }, [itemId, attributeForm]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (isModalVisible) {
      fetchItemAttributes();
    }
  }, [isModalVisible, fetchItemAttributes]);

  return (
    <Form form={productForm} layout="vertical" className="form-with-menu">
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
              form={productForm}
              onBlur={onBlur}
              fieldName="unit"
              placeholder="Выберите единицу измерения"
              value={productForm.getFieldValue('unit')}
              getId={item => item.id ?? 0}
              getLabel={item => item.name ?? ''}
              fetchDataList={getAllUnit}
              onCreateNew={actions?.onCreateNewUnit}
              disabled={!productForm.getFieldValue('title')}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Категория" name="category">
            <SimpleSelect
              form={productForm}
              onBlur={onBlur}
              fieldName="category"
              placeholder="Выберите категорию"
              value={productForm.getFieldValue('category')}
              getId={item => item.id ?? 0}
              getLabel={item => item.title ?? ''}
              fetchDataList={getAllCategory}
              onCreateNew={actions?.onCreateNewCategory}
              disabled={!productForm.getFieldValue('title')}
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
              initialValues={{ attributes: itemAttributes }}
              renderForm={attributeForm => (
                <ItemAttributeForm
                  initialValues={{ attributes: itemAttributes }}
                  attributeForm={attributeForm}
                />
              )}
              title="Конфигурация атрибутов продукта"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
