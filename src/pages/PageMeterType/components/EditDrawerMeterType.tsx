import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {EditDrawerProps, TypeMeterTypeFormValue, TypeUnit} from "../../../types";
import {getMeterTypeById, getAllUnit} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormOperation} from "./FormMeterType";

export const EditDrawerMeterType: React.FC<EditDrawerProps<TypeMeterTypeFormValue>> = ({
                                                                                         isOpen,
                                                                                         selectedItemId,
                                                                                         onCancel,
                                                                                         updateItem,
                                                                                       }) => {
  const [form] = Form.useForm();

  // Все единицы измерения, выбранная единица измерения, единица измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем unit
  const {
    onChangeField: onChangeUnit,
    onClearField: onClearUnit,
    onSearchField: onSearchUnit
  } = useFormField(form, 'unit');

  // Функция для получения данных в дравер
  const handleGetMeterType = useCallback((): void => {
    if (selectedItemId) {
      getMeterTypeById(selectedItemId).then((meterType) => {
        form.setFieldsValue({
          ...meterType,
          unit: meterType?.unit?.id === 0 ? '' : meterType?.unit?.id,
        })
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetMeterType()
    }
  }, [isOpen, selectedItemId, handleGetMeterType, form]);

  useEffect(() => {
    getAllUnit().then((allUnit) => {
      setAllUnit(allUnit);
    });
  }, []);

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
      <FormOperation
        form={form}
        allUnit={allUnit}
        onChangeUnit={onChangeUnit}
        onClearUnit={onClearUnit}
        onSearchUnit={onSearchUnit}
      />
    </Drawer>
  )
}