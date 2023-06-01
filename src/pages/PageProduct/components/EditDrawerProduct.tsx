import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {EditDrawerProps, TypeProductGroup, TypeProductFormValue, TypeUnit} from "../../../types";
import {getAllProductGroup, getProductById, getAllUnit} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormProduct} from "./FormProduct";

export const EditDrawerProduct: React.FC<EditDrawerProps<TypeProductFormValue>> = ({
                                                                                     isOpen,
                                                                                     selectedItemId,
                                                                                     onCancel,
                                                                                     updateItem,
                                                                                   }) => {
  const [form] = Form.useForm();

  // Все единицы измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>([]);

  // Все товарные группы
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем unit
  const {
    onChangeField: onChangeUnit,
    onClearField: onClearUnit,
    onSearchField: onSearchUnit,
  } = useFormField(form, 'unit');

  // Хук для управления полем productGroup
  const {
    onChangeField: onChangeProductGroup,
    onClearField: onClearProductGroup,
    onSearchField: onSearchProductGroup,
  } = useFormField(form, 'productGroup');

  // Функция для получения данных в дравер
  const handleGetProduct = useCallback((): void => {
    if (selectedItemId) {
      getProductById(selectedItemId).then((product) => {
        form.setFieldsValue({
          ...product,
          unit: product?.unit?.id === 0 ? '' : product?.unit?.id,
          productGroup: product?.productGroup?.id === 0 ? '' : product?.productGroup?.id,
        })
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetProduct()
    }
  }, [isOpen, selectedItemId, handleGetProduct]);

  useEffect(() => {
    getAllUnit().then((allUnit) => {
      setAllUnit(allUnit);
    });
  }, []);

  useEffect(() => {
    getAllProductGroup().then((allProductGroup) => {
      setAllProductGroup(allProductGroup);
    });
  }, []);

  return (
    <Drawer
      title="Редактирование товара"
      width={700}
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
      <FormProduct
        form={form}
        allUnit={allUnit}
        onChangeUnit={onChangeUnit}
        onClearUnit={onClearUnit}
        onSearchUnit={onSearchUnit}
        allProductGroup={allProductGroup}
        onChangeProductGroup={onChangeProductGroup}
        onClearProductGroup={onClearProductGroup}
        onSearchProductGroup={onSearchProductGroup}
      />
    </Drawer>
  )
}