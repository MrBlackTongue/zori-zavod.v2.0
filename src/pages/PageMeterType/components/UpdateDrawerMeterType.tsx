import React, {useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {UpdateDrawerProps, TypeMeterTypeFormValue} from "../../../types";
import {getMeterTypeById} from "../../../services";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormMeterType} from "./FormMeterType";

export const UpdateDrawerMeterType: React.FC<UpdateDrawerProps<TypeMeterTypeFormValue>> = ({
                                                                                             isOpen,
                                                                                             selectedItemId,
                                                                                             onCancel,
                                                                                             updateItem,
                                                                                           }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allUnit} = useFetchAllData({depsUnit: isOpen});

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем unit
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'unit');

  // Функция для получения данных в дравер
  const handleGetMeterType = useCallback((): void => {
    if (selectedItemId) {
      getMeterTypeById(selectedItemId)
        .then((data) => {
          form.setFieldsValue({
            ...data,
            unit: data?.unit?.id === 0 ? '' : data?.unit?.id,
          })
        })
        .catch((error) => console.error("Ошибка при получении данных: ", error));
    }
  }, [selectedItemId, form])

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetMeterType()
    }
  }, [isOpen, selectedItemId, handleGetMeterType, form]);

  return (
    <Drawer
      title="Редактирование типа счетчика"
      width={700}
      open={isOpen}
      onClose={onCancel}
      extra={
        <Space>
          <Button onClick={handleReset}>Отмена</Button>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <FormMeterType
        form={form}
        allUnit={allUnit}
        onChangeUnit={onChangeSelect}
        onClearUnit={onClearSelect}
        onSearchUnit={onSearchSelect}
      />
    </Drawer>
  )
}