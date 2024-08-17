import React from 'react';
import { FormViewProps, TypeProduct } from '../../../../types';
import { useLoadingAndSaving } from '../../../../contexts/LoadingAndSavingContext';
import { FormHeader } from '../../../atoms/FormHeader/FormHeader';
import { FormRadio } from '../../../atoms/FormRadio/FormRadio';
import { MainForm } from './main/MainForm';

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
          <MainForm
            productForm={form}
            onBlur={onBlur}
            onTitleChange={setTitle}
            actions={actions}
          />
        );
      case 'recipe':
        return (
          <div className="form-with-menu">
            Страница с рецептом товара скоро появится здесь...
          </div>
        );
      case 'operations':
        return (
          <div className="form-with-menu">
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
