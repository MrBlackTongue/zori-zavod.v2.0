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
import { useSimpleSelectActions } from '../../../../../hooks';

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
}) => {
  // Преобразование id из пути в число
  const { id: rawId } = useParams<{ id?: string }>();
  const itemId = rawId ? parseInt(rawId, 10) : undefined;
  const [attributeForm] = Form.useForm();
  const { onCreateNewCategory, onCreateNewUnit } = useSimpleSelectActions();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemAttributes, setItemAttributes] = useState<TypeItemAttribute[]>([]);

  const createAttributes = async (newAttributes: TypeItemAttribute[]) => {
    const createPromises = newAttributes.map(attribute =>
      createItemAttribute({
        itemId: itemId!,
        title: attribute.title,
        values: attribute.values,
      }),
    );
    await Promise.all(createPromises);
  };

  const updateAttributes = async (updatedAttributes: TypeItemAttribute[]) => {
    const updatePromises = updatedAttributes.map(attribute =>
      updateItemAttribute({
        id: attribute.id!,
        itemId: attribute.itemId,
        title: attribute.title,
        values: attribute.values.map(value => ({
          ...(value.id && value.id !== 0 && { id: value.id }), // кажется не работает условие
          value: value.value,
          attributeId: attribute.id,
        })),
      }),
    );

    await Promise.all(updatePromises);
  };

  const deleteAttributes = async (deletedAttributes: TypeItemAttribute[]) => {
    const deletePromises = deletedAttributes
      .filter(attribute => attribute.id !== undefined)
      .map(attribute => deleteItemAttributeById(attribute.id!));
    await Promise.all(deletePromises);
  };

  const handleSubmit = async (values: { attributes: TypeItemAttribute[] }) => {
    if (!itemId) return;

    try {
      const { attributes } = values;
      const validAttributes = attributes.filter(
        attr => attr.title !== undefined && attr.values !== undefined,
      );

      const newAttributes = validAttributes.filter(attr => !attr.id);
      const updatedAttributes = validAttributes.filter(attr => {
        const initialAttr = itemAttributes.find(
          initAttr => initAttr.id === attr.id,
        );
        if (!initialAttr) return false;

        return (
          attr.title !== initialAttr.title ||
          attr.values.length !== initialAttr.values.length ||
          attr.values.some(
            (value, index) => value.value !== initialAttr.values[index]?.value,
          )
        );
      });
      const deletedAttributes = itemAttributes.filter(
        attr => !attributes.some(newAttr => newAttr.id === attr.id),
      );

      await createAttributes(newAttributes);
      await updateAttributes(updatedAttributes);
      await deleteAttributes(deletedAttributes);

      setIsModalVisible(false);
    } catch (error) {
      console.error('Ошибка при сохранении атрибутов:', error);
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
      fetchItemAttributes().catch(error => error);
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
              allowCreation={true}
              fieldName="unit"
              placeholder="Выберите единицу измерения"
              value={productForm.getFieldValue('unit')}
              getId={item => item.id ?? 0}
              getLabel={item => item.name ?? ''}
              fetchDataList={getAllUnit}
              onCreateNew={onCreateNewUnit}
              disabled={!productForm.getFieldValue('title')}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Категория" name="category">
            <SimpleSelect
              form={productForm}
              onBlur={onBlur}
              allowCreation={true}
              fieldName="category"
              placeholder="Выберите категорию"
              value={productForm.getFieldValue('category')}
              getId={item => item.id ?? 0}
              getLabel={item => item.title ?? ''}
              fetchDataList={getAllCategory}
              onCreateNew={onCreateNewCategory}
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
              renderForm={form => (
                <ItemAttributeForm
                  initialValues={{ attributes: itemAttributes }}
                  attributeForm={form}
                />
              )}
              form={attributeForm}
              title="Конфигурация атрибутов продукта"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
