import React from 'react';
import { TypeEmployee } from '../../../../types';
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from '../../../../api';
import { EmployeeFormView } from './EmployeeForm.view';
import { GeneralFormContainer } from '../../../molecules/GeneralFormContainer/GeneralFormContainer';

export const EmployeeFormContainer = () => {
  return (
    <GeneralFormContainer<TypeEmployee>
      createFunction={createEmployee}
      updateFunction={updateEmployee}
      getByIdFunction={getEmployeeById}
      FormViewComponent={EmployeeFormView}
      titleCreate="Добавление нового сотрудника"
      titleEdit="Редактирование сотрудника"
    />
  );
};
