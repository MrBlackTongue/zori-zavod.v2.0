import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypeMeterRecordFormValue, UpdateDrawerProps } from '../../../types';
import { getMeterRecordById } from '../../../services';
import { useFetchAllData, useFormHandler, useFormSelect } from '../../../hooks';
import { FormMeterRecord } from './FormMeterRecord';
import dayjs from 'dayjs';

export const UpdateDrawerMeterRecord: React.FC<
  UpdateDrawerProps<TypeMeterRecordFormValue>
> = ({ isOpen, onCancel, updateItem, selectedItemId }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allMeter } = useFetchAllData({ depsMeter: isOpen });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Хук для управления полем meter
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'meter',
  );

  // Функция для получения данных в drawer
  const handleGetMeterRecord = useCallback((): void => {
    if (selectedItemId) {
      getMeterRecordById(selectedItemId)
        .then(data => {
          form.setFieldsValue({
            ...data,
            date: dayjs(data?.date),
            meter: data?.meter?.id === 0 ? '' : data?.meter?.id,
          });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetMeterRecord();
    }
  }, [isOpen, selectedItemId, handleGetMeterRecord, form]);

  return (
    <Drawer
      title="Редактирование счетчика"
      width={600}
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
      <FormMeterRecord
        form={form}
        allMeter={allMeter}
        onChangeMeter={onChangeSelect}
        onClearMeter={onClearSelect}
        onSearchMeter={onSearchSelect}
      />
    </Drawer>
  );
};
