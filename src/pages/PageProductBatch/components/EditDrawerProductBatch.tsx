import React, {useState, useEffect, useCallback} from "react";
import {Form, Drawer, Space, Button} from "antd";
import {EditDrawerProps, TypeProduct, TypeProductBatchFormValue} from "../../../types";
import {getAllProduct, getProductBatchById} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormProductBatch} from "./FormProductBatch";

export const EditDrawerProductBatch: React.FC<EditDrawerProps<TypeProductBatchFormValue>> = ({
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

  // Функция для получения данных в дравер
  const handleGetProductBatch = useCallback((): void => {
    if (selectedItemId) {
      getProductBatchById(selectedItemId).then((productBatch) => {
        form.setFieldsValue({
          ...productBatch,
          product: productBatch?.product?.id === 0 ? '' : productBatch?.product?.id,
        });
      })
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetProductBatch();
    }
  }, [isOpen, selectedItemId, handleGetProductBatch]);

  useEffect(() => {
    getAllProduct().then((allProduct) => {
      setAllProduct(allProduct);
    });
  }, []);

  return (
    <Drawer
      title="Редактирование партии товаров"
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
      <FormProductBatch
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeProduct}
        onClearProduct={onClearProduct}
        onSearchProduct={onSearchProduct}
      />
    </Drawer>
  )
}