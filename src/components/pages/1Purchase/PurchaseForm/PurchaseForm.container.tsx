import React from 'react';
import { TypeClient } from '../../../../types';
import {
  createPurchase,
  getPurchaseById,
  updatePurchase,
} from '../../../../api';
import { PurchaseFormView } from './PurchaseForm.view';
import { GeneralFormContainer } from '../../../molecules/GeneralFormContainer/GeneralFormContainer';

export const PurchaseFormContainer = () => {
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
    <GeneralFormContainer<TypeClient>
      createFunction={createPurchase}
      updateFunction={updatePurchase}
      getByIdFunction={getPurchaseById}
      FormViewComponent={PurchaseFormView}
      titleCreate="Добавление новой закупки"
      titleEdit="Редактирование закупки"
    />
  );
};
