import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { FormViewProps, TypeProduct } from '../../../../types';
import { getAllCategory, getAllUnit } from '../../../../api';
import { SimpleSelect } from '../../../atoms/SimpleSelect/SimpleSelect';
import { useLoadingAndSaving } from '../../../../contexts/LoadingAndSavingContext';
import { FormHeader } from '../../../atoms/FormHeader/FormHeader';
import { FormRadio } from '../../../atoms/FormRadio/FormRadio';

export const ProductFormView: React.FC<FormViewProps<TypeProduct>> = ({
  form,
  onBlur,
  onCancel,
  actions,
}) => {
  const { isSaving } = useLoadingAndSaving();

  // Состояние для хранения значения поля title
  const [title, setTitle] = React.useState(form.getFieldValue('title'));

  // Состояние для выбранной опции
  const [selectedOption, setSelectedOption] = React.useState('main');

  // Опции для радио-кнопок
  const radioOptions = [
    { value: 'main', label: 'Главная информация' },
    { value: 'recipe', label: 'Рецепт' },
    { value: 'operations', label: 'Операции' },
  ];

  // Содержимое опций
  const renderContent = () => {
    switch (selectedOption) {
      case 'main':
        return (
          <Form form={form} layout="vertical" className="form-with-radio">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Название товара"
                  name="title"
                  rules={[
                    { required: true, message: 'введите название товара' },
                  ]}>
                  <Input
                    placeholder="Название"
                    onBlur={onBlur}
                    onPressEnter={onBlur}
                    onChange={event => setTitle(event.target.value)}
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
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        );
      case 'recipe':
        return (
          <div className="form-with-radio">
            Страница с рецептом товара скоро появится здесь...
          </div>
        );
      case 'operations':
        return (
          <div className="form-with-radio">
            Страница с операциями товара скоро появится здесь...
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-form-style">
      <FormHeader
        header="Товар"
        title={title}
        isSaving={isSaving}
        onCancel={onCancel}
      />
      <FormRadio
        value={selectedOption}
        onChange={setSelectedOption}
        options={radioOptions}
      />
      {renderContent()}
    </div>
  );
};
