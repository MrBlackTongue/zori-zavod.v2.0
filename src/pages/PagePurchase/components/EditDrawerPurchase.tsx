import React, {useEffect, useCallback} from "react";
import {Form, Drawer, Space, Button} from "antd";
import {EditDrawerProps, TypePurchaseFormValue} from "../../../types";
import {getPurchaseById} from "../../../services";
import dayjs from 'dayjs';
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormPurchase} from "./FormPurchase";

export const EditDrawerPurchase: React.FC<EditDrawerProps<TypePurchaseFormValue>> = ({
                                                                                       isOpen,
                                                                                       selectedItemId,
                                                                                       onCancel,
                                                                                       updateItem,
                                                                                     }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allProduct} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем product
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'product');

  // Функция для получения данных о закупке по id и обновления формы
  const handleGetPurchase = useCallback((): void => {
    if (selectedItemId) {
      getPurchaseById(selectedItemId).then((purchase) => {
        form.setFieldsValue({
          ...purchase,
          date: dayjs(purchase?.date),
          product: purchase?.product?.id === 0 ? '' : purchase?.product?.id,
          paid: purchase?.paid || false,
        });
      })
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetPurchase();
    }
  }, [isOpen, selectedItemId, handleGetPurchase]);

  return (
    <Drawer
      title="Редактирование закупки"
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
      <FormPurchase
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeSelect}
        onClearProduct={onClearSelect}
        onSearchProduct={onSearchSelect}
      />
    </Drawer>
  )
}