import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import { TypeEmployee } from '../../../types';
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from '../../../services';
import { EmployeeFormView } from '../components/EmployeeForm.view';
import { useNavigate, useParams } from 'react-router-dom';

export const EmployeeFormContainer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: rawId } = useParams<string>();

  const [title, setTitle] = useState('');

  // Приведение rawId к числу или установка в undefined
  const employeeId = rawId && !isNaN(Number(rawId)) ? Number(rawId) : undefined;
  const isCreateMode = employeeId === undefined;
  const isUpdateMode = employeeId !== undefined;

  // Функция для создания или обновления сотрудника
  const handleSubmit = async (values: TypeEmployee) => {
    if (isCreateMode) {
      await createEmployee(values);
    } else {
      await updateEmployee({ ...values, id: employeeId });
    }
    navigate(-1);
  };

  // Функция для отмены создания сотрудника и возврата на предыдущую страницу
  const handleCancel = () => {
    navigate(-1);
  };

  // Получаем данные сотрудника для редактирования
  const handleGetEmployee = useCallback(async () => {
    if (isUpdateMode && employeeId) {
      try {
        const data = await getEmployeeById(employeeId);
        form.setFieldsValue(data);
      } catch (error) {
        console.error('Ошибка при получении данных сотрудника:', error);
      }
    }
  }, [employeeId, form, isUpdateMode]);

  // Загрузка данных сотрудника при редактировании
  useEffect(() => {
    (async () => {
      if (isUpdateMode) {
        try {
          await handleGetEmployee();
        } catch (error) {
          console.error('Ошибка при получении данных сотрудника:', error);
        }
      }
    })();
  }, [handleGetEmployee, isUpdateMode]);

  useEffect(() => {
    setTitle(
      isCreateMode ? 'Добавление сотрудника' : 'Редактирование сотрудника',
    );
  }, [isCreateMode, rawId]);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <EmployeeFormView
        form={form}
        onFinish={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};
