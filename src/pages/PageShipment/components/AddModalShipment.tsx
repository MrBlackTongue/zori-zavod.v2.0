import React from "react";
import {AddModalProps, TypeShipmentFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormShipment} from "./FormShipment";

export const AddModalShipment: React.FC<AddModalProps<TypeShipmentFormValue>> = ({
                                                                                   isOpen,
                                                                                   addItem,
                                                                                   onCancel,
                                                                                 }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allClient} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем client
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'client');

  return (
    <Modal
      title={`Добавление новой отгрузки`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={500}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormShipment
        form={form}
        allClient={allClient}
        onChangeClient={onChangeSelect}
        onClearClient={onClearSelect}
        onSearchClient={onSearchSelect}
      />
    </Modal>
  )
}