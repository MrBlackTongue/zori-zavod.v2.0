import React, {useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {UpdateDrawerProps, TypeOperationFormValue} from "../../../types";
import {getOperationById} from "../../../services";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks"
import {FormOperation} from "./FormOperation";

export const UpdateDrawerOperation: React.FC<UpdateDrawerProps<TypeOperationFormValue>> = ({
                                                                                             isOpen,
                                                                                             selectedItemId,
                                                                                             onCancel,
                                                                                             updateItem,
                                                                                           }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allUnit} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем unit
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'unit');

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
        onChangeUnit={onChangeSelect}
        onClearUnit={onClearSelect}
        onSearchUnit={onSearchSelect}
      />
    </Drawer>
  )
}