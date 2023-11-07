import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypeWriteOffFormValue, UpdateDrawerProps } from '../../../types';
import { getWriteOffById } from '../../../services';
import { useFetchAllData, useFormHandler, useFormSelect } from '../../../hooks';
import { FormWriteOff } from './FormWriteOff';

export const UpdateDrawerWriteOff: React.FC<
  UpdateDrawerProps<TypeWriteOffFormValue>
> = ({ isOpen, selectedItemId, onCancel, updateItem }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allEmployee, allProductionType } = useFetchAllData({
    depsEmployee: isOpen,
    depsProductionType: isOpen,
  });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Хук для управления полем employee
  const {
    onChangeSelect: onChangeEmployee,
    onClearSelect: onClearEmployee,
    onSearchSelect: onSearchEmployee,
  } = useFormSelect(form, 'employee');

  // Хук для управления полем productionType
  const {
    onChangeSelect: onChangeProductionType,
    onClearSelect: onClearProductionType,
    onSearchSelect: onSearchProductionType,
  } = useFormSelect(form, 'productionType');

  // Функция для получения данных
  const handleGetWriteOff = useCallback((): void => {
    if (selectedItemId) {
      getWriteOffById(selectedItemId)
        .then(data => {
          form.setFieldsValue({
            ...data,
            employee: data?.employee?.id === 0 ? '' : data?.employee?.id,
            productionType:
              data?.productionType?.id === 0 ? '' : data?.productionType?.id,
          });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetWriteOff();
    }
  }, [isOpen, selectedItemId, handleGetWriteOff, form]);

  return (
    <Drawer
      title="Редактирование списания"
      width={650}
      open={isOpen}
      onClose={handleReset}
      extra={
        <Space>
          <Button onClick={handleReset}>Отмена</Button>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }>
      <FormWriteOff
        form={form}
        allEmployee={allEmployee}
        onChangeEmployee={onChangeEmployee}
        onClearEmployee={onClearEmployee}
        onSearchEmployee={onSearchEmployee}
        allProductionType={allProductionType}
        onChangeProductionType={onChangeProductionType}
        onClearProductionType={onClearProductionType}
        onSearchProductionType={onSearchProductionType}
      />
    </Drawer>
  );
};
