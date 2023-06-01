import React, {useState, useEffect, useCallback} from "react";
import {Form, Drawer, Space, Button} from "antd";
import {EditDrawerProps, TypeProduct, TypeStockFormValue} from "../../../types";
import {getStockById, getAllProduct} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormStock} from "./FormStock";

export const EditDrawerStock: React.FC<EditDrawerProps<TypeStockFormValue>> = ({
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

  // Функция для получения данных
  const handleGetStock = useCallback((): void => {
    if (selectedItemId) {
      getStockById(selectedItemId).then((stock) => {
        form.setFieldsValue({
          ...stock,
          product: stock?.product?.id === 0 ? '' : stock?.product?.id,
        });
      });
    }
  }, [selectedItemId, form]);


  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetStock();
    }
  }, [isOpen, selectedItemId, handleGetStock]);

  useEffect(() => {
    getAllProduct().then((allProduct) => {
      setAllProduct(allProduct);
    });
  }, []);

  return (
    <Drawer
      title="Редактирование ячейки на складе"
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
      <FormStock
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeProduct}
        onClearProduct={onClearProduct}
        onSearchProduct={onSearchProduct}
      />
    </Drawer>
  );
};
