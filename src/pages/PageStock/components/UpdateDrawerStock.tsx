import React, {useEffect, useCallback} from "react";
import {Form, Drawer, Space, Button} from "antd";
import {UpdateDrawerProps, TypeStockFormValue} from "../../../types";
import {getStockById} from "../../../services";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormStock} from "./FormStock";

export const UpdateDrawerStock: React.FC<UpdateDrawerProps<TypeStockFormValue>> = ({
                                                                                     isOpen,
                                                                                     selectedItemId,
                                                                                     onCancel,
                                                                                     updateItem,
                                                                                   }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allProduct} = useFetchAllData({depsProduct: isOpen});

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем product
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'product');

  // Функция для получения данных
  const handleGetStock = useCallback((): void => {
    if (selectedItemId) {
      getStockById(selectedItemId).then((data) => {
        form.setFieldsValue({
          ...data,
          product: data?.product?.id === 0 ? '' : data?.product?.id,
        });
      });
    }
  }, [selectedItemId, form]);


  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetStock();
    }
  }, [isOpen, selectedItemId, handleGetStock]);

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
        onChangeProduct={onChangeSelect}
        onClearProduct={onClearSelect}
        onSearchProduct={onSearchSelect}
      />
    </Drawer>
  );
};
