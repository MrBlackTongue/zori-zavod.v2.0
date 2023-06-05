import React from "react";
import {AddModalProps, TypeOperationTimesheetFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormOperationTimesheet} from "./FormOperationTimesheet";

export const AddModalOperationTimesheet: React.FC<AddModalProps<TypeOperationTimesheetFormValue>> = ({
                                                                                                       isOpen,
                                                                                                       addItem,
                                                                                                       onCancel,
                                                                                                     }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allEmployee} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем employee
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'employee');

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
        onChangeEmployee={onChangeSelect}
        onClearEmployee={onClearSelect}
        onSearchEmployee={onSearchSelect}
      />
    </Modal>
  )
}