import React from "react";
import {Form, Modal} from "antd";
import {CreateModalProps, TypeMeterTypeFormValue} from "../../../types";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormMeterType} from "./FormMeterType";

export const CreateModalMeterType: React.FC<CreateModalProps<TypeMeterTypeFormValue>> = ({
                                                                                           isOpen,
                                                                                           createItem,
                                                                                           onCancel,
                                                                                         }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allUnit} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

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
      <FormMeterType
        form={form}
        allUnit={allUnit}
        onChangeUnit={onChangeSelect}
        onClearUnit={onClearSelect}
        onSearchUnit={onSearchSelect}
      />
    </Modal>
  )
}