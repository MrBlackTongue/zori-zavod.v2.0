import React from "react";
import {Form, Modal} from "antd";
import {AddModalProps, TypeMeterTypeFormValue} from "../../../types";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormOperation} from "./FormMeterType";

export const AddModalMeterType: React.FC<AddModalProps<TypeMeterTypeFormValue>> = ({
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
      title={`Добавление нового типа счетчика`}
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