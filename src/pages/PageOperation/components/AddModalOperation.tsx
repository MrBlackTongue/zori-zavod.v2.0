import React from "react";
import {AddModalProps, TypeOperationFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks"
import {FormOperation} from "./FormOperation";

export const AddModalOperation: React.FC<AddModalProps<TypeOperationFormValue>> = ({
                                                                                     isOpen,
                                                                                     addItem,
                                                                                     onCancel,
                                                                                   }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allUnit} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем unit
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'unit');

  return (
    <Modal
      title={`Добавление новой операции`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={700}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormOperation
        form={form}
        allUnit={allUnit}
        onChangeUnit={onChangeSelect}
        onClearUnit={onClearSelect}
        onSearchUnit={onSearchSelect}
      />
    </Modal>
  )
}