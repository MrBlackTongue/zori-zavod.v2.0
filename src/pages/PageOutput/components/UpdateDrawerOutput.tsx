import React, {useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {UpdateDrawerProps, TypeOutputFormValue} from "../../../types";
import {getOutputById} from "../../../services";
import dayjs from 'dayjs';
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormOutput} from "./FormOutput";

export const UpdateDrawerOutput: React.FC<UpdateDrawerProps<TypeOutputFormValue>> = ({
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

  // Функция для получения данных о выпуске продукции по id и обновления формы
  const handleGetOutput = useCallback((): void => {
    if (selectedItemId) {
      getOutputById(selectedItemId).then((data) => {
        form.setFieldsValue({
          date: dayjs(data?.date),
          product: data?.product?.id === 0 ? '' : data?.product?.id,
        });
      })
    }
  }, [selectedItemId, form]);

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
        onChangeProduct={onChangeSelect}
        onClearProduct={onClearSelect}
        onSearchProduct={onSearchSelect}
      />
    </Drawer>
  )
}