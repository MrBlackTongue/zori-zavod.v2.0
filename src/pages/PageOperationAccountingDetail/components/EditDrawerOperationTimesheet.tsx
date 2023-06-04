import React, {useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {EditDrawerProps, TypeOperationTimesheetFormValue} from "../../../types";
import {getOperationTimesheetById} from "../../../services";
import {useFetchData, useFormField, useFormHandler} from "../../../hooks";
import {FormOperationTimesheet} from "./FormOperationTimesheet";

export const EditDrawerOperationTimesheet:
  React.FC<EditDrawerProps<TypeOperationTimesheetFormValue>> = ({
                                                                  isOpen,
                                                                  selectedItemId,
                                                                  onCancel,
                                                                  updateItem,
                                                                }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allEmployee} = useFetchData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем employee
  const {
    onChangeField: onChangeEmployee,
    onClearField: onClearEmployee,
    onSearchField: onSearchEmployee,
  } = useFormField(form, 'employee');

  // Функция для получения данных в дравер
  const handleGetOperationTimesheet = useCallback((): void => {
    if (selectedItemId) {
      getOperationTimesheetById(selectedItemId).then((operationTimesheet) => {
        form.setFieldsValue({
          ...operationTimesheet,
          employee: operationTimesheet?.employee?.id === 0 ? '' : operationTimesheet?.employee?.id,
        })
      })
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetOperationTimesheet()
    }
  }, [isOpen, selectedItemId, handleGetOperationTimesheet]);

  return (
    <Drawer
      title="Редактирование табеля учета рабочего времени"
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
      <FormOperationTimesheet
        form={form}
        allEmployee={allEmployee}
        onChangeEmployee={onChangeEmployee}
        onClearEmployee={onClearEmployee}
        onSearchEmployee={onSearchEmployee}
      />
    </Drawer>
  )
}