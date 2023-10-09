import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import {
  TypeOperationAccountingFormValue,
  UpdateDrawerProps,
} from '../../../types';
import { getOperationAccountingById } from '../../../services';
import dayjs from 'dayjs';
import { useFetchAllData, useFormHandler, useFormSelect } from '../../../hooks';
import { FormOperationAccounting } from './FormOperationAccounting';

export const UpdateDrawerOperationAccounting: React.FC<
  UpdateDrawerProps<TypeOperationAccountingFormValue>
> = ({ isOpen, selectedItemId, onCancel, updateItem }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allOperation, allProductionType, allOutput } = useFetchAllData({
    depsOperation: isOpen,
    depsProductionType: isOpen,
    depsOutput: isOpen,
  });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Хук для управления полем operation
  const {
    onChangeSelect: onChangeOperation,
    onClearSelect: onClearOperation,
    onSearchSelect: onSearchOperation,
  } = useFormSelect(form, 'operation');

  // Хук для управления полем output
  const {
    onChangeSelect: onChangeOutput,
    onClearSelect: onClearOutput,
    onSearchSelect: onSearchOutput,
  } = useFormSelect(form, 'output');

  // Хук для управления полем productionType
  const {
    onChangeSelect: onChangeProductionType,
    onClearSelect: onClearProductionType,
    onSearchSelect: onSearchProductionType,
  } = useFormSelect(form, 'productionType');

  // Функция для получения данных в дравер
  const handleGetOperationAccounting = useCallback((): void => {
    if (selectedItemId) {
      getOperationAccountingById(selectedItemId)
        .then(data => {
          form.setFieldsValue({
            ...data,
            date: dayjs(data?.date),
            operation: data?.operation?.id === 0 ? '' : data?.operation?.id,
            output: data?.output?.id === 0 ? '' : data?.output?.id,
            productionType:
              data?.productionType?.id === 0 ? '' : data?.productionType?.id,
          });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetOperationAccounting();
    }
  }, [isOpen, selectedItemId, handleGetOperationAccounting]);

  return (
    <Drawer
      title="Редактирование учетной операции"
      width={700}
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
      <FormOperationAccounting
        form={form}
        allOperation={allOperation}
        onChangeOperation={onChangeOperation}
        onClearOperation={onClearOperation}
        onSearchOperation={onSearchOperation}
        allOutput={allOutput}
        onChangeOutput={onChangeOutput}
        onClearOutput={onClearOutput}
        onSearchOutput={onSearchOutput}
        allProductionType={allProductionType}
        onChangeProductionType={onChangeProductionType}
        onClearProductionType={onClearProductionType}
        onSearchProductionType={onSearchProductionType}
      />
    </Drawer>
  );
};
