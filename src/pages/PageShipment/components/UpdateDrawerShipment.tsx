import React, {useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {UpdateDrawerProps, TypeShipmentFormValue} from "../../../types";
import {getShipmentById} from "../../../services";
import dayjs from 'dayjs';
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormShipment} from "./FormShipment";

export const UpdateDrawerShipment: React.FC<UpdateDrawerProps<TypeShipmentFormValue>> = ({
                                                                                           isOpen,
                                                                                           selectedItemId,
                                                                                           onCancel,
                                                                                           updateItem,
                                                                                         }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allClient} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем client
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'client');


  // Функция для получения данных об отгрузке по id и обновления формы
  const handleGetShipment = useCallback(() => {
    if (selectedItemId) {
      getShipmentById(selectedItemId).then((data) => {
        form.setFieldsValue({
          ...data,
          date: dayjs(data?.date),
          client: data?.client?.id === 0 ? '' : data?.client?.id
        });
      })
    }
  }, [selectedItemId, form]);

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
        onChangeClient={onChangeSelect}
        onClearClient={onClearSelect}
        onSearchClient={onSearchSelect}
      />
    </Drawer>
  )
}