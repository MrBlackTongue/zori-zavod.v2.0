import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {EditDrawerProps, TypeClient, TypeShipmentFormValue} from "../../../types";
import {getShipmentById, getAllClient} from "../../../services";
import dayjs from 'dayjs';
import {useFormField, useFormHandler} from "../../../hooks";
import {FormShipment} from "./FormShipment";

export const EditDrawerShipment: React.FC<EditDrawerProps<TypeShipmentFormValue>> = ({
                                                                                       isOpen,
                                                                                       selectedItemId,
                                                                                       onCancel,
                                                                                       updateItem,
                                                                                     }) => {
  const [form] = Form.useForm();

  // Все клиенты
  const [allClient, setAllClient] = useState<TypeClient[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем client
  const {
    onChangeField: onChangeClient,
    onClearField: onClearClient,
    onSearchField: onSearchClient,
  } = useFormField(form, 'client');


  // Функция для получения данных об отгрузке по id и обновления формы
  const handleGetShipment = useCallback(() => {
    if (selectedItemId) {
      getShipmentById(selectedItemId).then((shipment) => {
        form.setFieldsValue({
          ...shipment,
          date: dayjs(shipment?.date),
          client: shipment?.client?.id === 0 ? '' : shipment?.client?.id
        });
      })
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    getAllClient().then((allClient) => {
      setAllClient(allClient);
    });
  }, []);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetShipment()
    }
  }, [isOpen, selectedItemId, handleGetShipment]);

  return (
    <Drawer
      title="Редактирование отгрузки"
      width={600}
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
      <FormShipment
        form={form}
        allClient={allClient}
        onChangeClient={onChangeClient}
        onClearClient={onClearClient}
        onSearchClient={onSearchClient}
      />
    </Drawer>
  )
}