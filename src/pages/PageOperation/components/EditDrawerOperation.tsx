import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {EditDrawerProps, TypeUnit, TypeOperationFormValue} from "../../../types";
import {getOperationById, getAllUnit} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks"
import {FormOperation} from "./FormOperation";

export const EditDrawerOperation: React.FC<EditDrawerProps<TypeOperationFormValue>> = ({
                                                                                         isOpen,
                                                                                         selectedItemId,
                                                                                         onCancel,
                                                                                         updateItem,
                                                                                       }) => {
  const [form] = Form.useForm();

  // Все единицы измерения
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
  const handleGetOperation = useCallback((): void => {
    if (selectedItemId) {
      getOperationById(selectedItemId).then((operation) => {
        form.setFieldsValue({
          ...operation,
          unit: operation?.unit?.id === 0 ? '' : operation?.unit?.id,
        })
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetOperation();
    }
  }, [isOpen, selectedItemId, handleGetOperation]);

  useEffect(() => {
    getAllUnit().then((allUnit) => {
      setAllUnit(allUnit);
    });
  }, []);

  return (
    <Drawer
      title="Редактирование операции"
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