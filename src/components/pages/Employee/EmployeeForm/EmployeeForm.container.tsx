import React from 'react';
import { TypeEmployee } from '../../../../types';
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from '../../../../services';
import { EmployeeFormView } from './EmployeeForm.view';
import { GeneralFormContainer } from '../../../molecules/GeneralFormContainer/GeneralFormContainer';

export const EmployeeFormContainer = () => {
  return (
    <GeneralFormContainer<TypeEmployee>
      createFunction={createEmployee}
      updateFunction={updateEmployee}
      getByIdFunction={getEmployeeById}
      FormViewComponent={EmployeeFormView}
      titleCreate="Добавление сотрудника"
      titleEdit="Редактирование сотрудника"
    />
  );
};
