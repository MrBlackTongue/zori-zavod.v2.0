import React from 'react';
import { FormPurchaseProps, TypeClient } from '../../../../types';
import {
  createPurchase,
  getPurchaseById,
  updatePurchase,
} from '../../../../api';
import { useFormSelect } from '../../../../hooks';
import { PurchaseFormView } from './PurchaseForm.view';
import { GeneralFormContainer } from '../../../molecules/GeneralFormContainer/GeneralFormContainer';
import { Form } from 'antd';

export const PurchaseFormContainer = () => {
  const [form] = Form.useForm();

  // Хук для управления полем product
  const {
    onChangeSelect: onChangeProduct,
    onClearSelect: onClearProduct,
    onSearchSelect: onSearchProduct,
  } = useFormSelect(form, 'product');

  // const extraProps: FormPurchaseProps = {
  //   allProduct,
  //   onChangeProduct: onChangeSelect,
  //   onClearProduct: onClearSelect,
  //   onSearchProduct: onSearchSelect,
  // };

  // // Функция для получения данных о закупке по id и обновления формы
  // const handleGetPurchase = useCallback((): void => {
  //   if (selectedItemId) {
  //     getPurchaseById(selectedItemId)
  //       .then(data => {
  //         form.setFieldsValue({
  //           ...data,
  //           date: dayjs(data?.date),
  //           product: data?.product?.id === 0 ? '' : data?.product?.id,
  //           paid: data?.paid ?? false,
  //         });
  //       })
  //       .catch(error => console.error('Ошибка при получении данных: ', error));
  //   }
  // }, [selectedItemId, form]);

  return (
    <GeneralFormContainer<TypeClient, FormPurchaseProps>
      createFunction={createPurchase}
      updateFunction={updatePurchase}
      getByIdFunction={getPurchaseById}
      FormViewComponent={PurchaseFormView}
      // extraProps={FormPurchaseProps}
      extraProps={{
        onChangeProduct,
        onClearProduct,
        onSearchProduct,
      }} // Передайте объект, а не тип
      titleCreate="Добавление новой закупки"
      titleEdit="Редактирование закупки"
    />
  );
};
