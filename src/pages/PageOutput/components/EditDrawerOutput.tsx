import React, {useCallback, useEffect, useState} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {EditDrawerProps, TypeOutputFormValue, TypeProduct} from "../../../types";
import {getOutputById, getAllProduct} from "../../../services";
import dayjs from 'dayjs';
import {useFormField, useFormHandler} from "../../../hooks";
import {FormOutput} from "./FormOutput";

export const EditDrawerOutput: React.FC<EditDrawerProps<TypeOutputFormValue>> = ({
                                                                                   isOpen,
                                                                                   selectedItemId,
                                                                                   onCancel,
                                                                                   updateItem,
                                                                                 }) => {
  const [form] = Form.useForm();

  // Все товары
  const [allProduct, setAllProduct] = useState<TypeProduct[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем product
  const {
    onChangeField: onChangeProduct,
    onClearField: onClearProduct,
    onSearchField: onSearchProduct,
  } = useFormField(form, 'product');

  // Функция для получения данных о выпуске продукции по id и обновления формы
  const handleGetOutput = useCallback((): void => {
    if (selectedItemId) {
      getOutputById(selectedItemId).then((output) => {
        form.setFieldsValue({
          date: dayjs(output?.date),
          product: output?.product?.id === 0 ? '' : output?.product?.id,
        });
      })
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    getAllProduct().then((allProduct) => {
      setAllProduct(allProduct);
    });
  }, []);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetOutput();
    }
  }, [isOpen, selectedItemId, handleGetOutput]);

  return (
    <Drawer
      title="Редактирование выпуска продукции"
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
      <FormOutput
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeProduct}
        onClearProduct={onClearProduct}
        onSearchProduct={onSearchProduct}
      />
    </Drawer>
  )
}