import React from "react";
import {CreateModalProps, TypeWriteOffFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchAllData, useFormHandler, useFormSelect} from "../../../hooks";
import {FormWriteOff} from "./FormWriteOff";

export const CreateModalWriteOff: React.FC<CreateModalProps<TypeWriteOffFormValue>> = ({
                                                                                         isOpen,
                                                                                         createItem,
                                                                                         onCancel,
                                                                                       }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allEmployee, allProductionType} = useFetchAllData({
    depsEmployee: isOpen,
    depsProductionType: isOpen,
  });

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

  // Хук для управления полем employee
  const {
    onChangeSelect: onChangeEmployee,
    onClearSelect: onClearEmployee,
    onSearchSelect: onSearchEmployee,
  } = useFormSelect(form, 'employee');

  // Хук для управления полем productionType
  const {
    onChangeSelect: onChangeProductionType,
    onClearSelect: onClearProductionType,
    onSearchSelect: onSearchProductionType,
  } = useFormSelect(form, 'productionType');

  return (
    <Modal
      title={`Добавление нового списания со склада`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={650}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormWriteOff
        form={form}
        allEmployee={allEmployee}
        onChangeEmployee={onChangeEmployee}
        onClearEmployee={onClearEmployee}
        onSearchEmployee={onSearchEmployee}
        allProductionType={allProductionType}
        onChangeProductionType={onChangeProductionType}
        onClearProductionType={onClearProductionType}
        onSearchProductionType={onSearchProductionType}
      />
    </Modal>
  )
}