import React from 'react';
import { TypeClient } from '../../../../types';
import {
  createClient,
  getClientById,
  updateClient,
} from '../../../../services';
import { ClientFormView } from './ClientForm.view';
import { GeneralFormContainer } from '../../../molecules/GeneralFormContainer/GeneralFormContainer';

export const ClientFormContainer = () => {
  return (
    <GeneralFormContainer<TypeClient>
      createFunction={createClient}
      updateFunction={updateClient}
      getByIdFunction={getClientById}
      FormViewComponent={ClientFormView}
      titleCreate="Добавление нового клиента"
      titleEdit="Редактирование клиента"
    />
  );
};
