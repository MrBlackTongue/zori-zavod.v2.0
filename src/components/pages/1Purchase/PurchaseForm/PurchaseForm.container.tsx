import React from 'react';
import { TypePurchase } from '../../../../types';
import {
  createPurchase,
  getPurchaseById,
  updatePurchase,
} from '../../../../api';
import { PurchaseFormView } from './PurchaseForm.view';
import { GeneralFormContainer } from '../../../molecules/GeneralFormContainer/GeneralFormContainer';
import dayjs from 'dayjs';

export const PurchaseFormContainer = () => {
  const processPurchaseData = (data: TypePurchase) => {
    if (typeof data.date === 'string') {
      // Преобразование строки в объект dayjs
      return { ...data, date: dayjs(data.date, 'YYYY-MM-DD') };
    } else if (data.date && dayjs.isDayjs(data.date)) {
      // Преобразование объекта dayjs обратно в строку
      return { ...data, date: data.date.format('YYYY-MM-DD') };
    }
    return data;
  };

  return (
    <GeneralFormContainer<TypePurchase>
      createFunction={createPurchase}
      updateFunction={updatePurchase}
      getByIdFunction={getPurchaseById}
      FormViewComponent={PurchaseFormView}
      processData={processPurchaseData}
      titleCreate="Добавление новой закупки"
      titleEdit="Редактирование закупки"
    />
  );
};
