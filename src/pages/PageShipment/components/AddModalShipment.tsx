import React, {useState, useEffect} from "react";
import {AddModalProps, TypeClient, TypeShipmentFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {getAllClient} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormShipment} from "./FormShipment";

export const AddModalShipment: React.FC<AddModalProps<TypeShipmentFormValue>> = ({
                                                                                   isOpen,
                                                                                   addItem,
                                                                                   onCancel,
                                                                                 }) => {
  const [form] = Form.useForm();

  // Все клиенты
  const [allClient, setAllClient] = useState<TypeClient[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем client
  const {
    onChangeField: onChangeClient,
    onClearField: onClearClient,
    onSearchField: onSearchClient,
  } = useFormField(form, 'client');

  useEffect(() => {
    getAllClient().then((allClient) => {
      setAllClient(allClient);
    });
  }, []);

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
        onChangeClient={onChangeClient}
        onClearClient={onClearClient}
        onSearchClient={onSearchClient}
      />
    </Modal>
  )
}