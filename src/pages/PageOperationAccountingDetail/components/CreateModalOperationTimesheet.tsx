import React from "react";
import {CreateModalProps, TypeOperationTimesheetFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormOperationTimesheet} from "./FormOperationTimesheet";

export const CreateModalOperationTimesheet: React.FC<CreateModalProps<TypeOperationTimesheetFormValue>> = ({
                                                                                                             isOpen,
                                                                                                             createItem,
                                                                                                             onCancel,
                                                                                                           }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allEmployee} = useFetchAllData({depsEmployee: isOpen});

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

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