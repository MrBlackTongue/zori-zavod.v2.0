import React from "react";
import {AddModalProps, TypeOperationTimesheetFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchData, useFormField, useFormHandler} from "../../../hooks";
import {FormOperationTimesheet} from "./FormOperationTimesheet";

export const AddModalOperationTimesheet: React.FC<AddModalProps<TypeOperationTimesheetFormValue>> = ({
                                                                                                       isOpen,
                                                                                                       addItem,
                                                                                                       onCancel,
                                                                                                     }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allEmployee} = useFetchData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем employee
  const {
    onChangeField: onChangeEmployee,
    onClearField: onClearEmployee,
    onSearchField: onSearchEmployee,
  } = useFormField(form, 'employee');

  return (
    <Modal
      title={`Добавление сотрудника в табель учета рабочего времени`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={600}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormOperationTimesheet
        form={form}
        allEmployee={allEmployee}
        onChangeEmployee={onChangeEmployee}
        onClearEmployee={onClearEmployee}
        onSearchEmployee={onSearchEmployee}
      />
    </Modal>
  )
}