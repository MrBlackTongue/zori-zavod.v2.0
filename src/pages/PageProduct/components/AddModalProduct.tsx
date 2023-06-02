import React, {useState, useEffect} from "react";
import {AddModalProps, TypeProductGroup, TypeProductFormValue, TypeUnit} from "../../../types";
import {Form, Modal} from "antd";
import {getAllUnit, getAllProductGroup} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormProduct} from "./FormProduct";

export const AddModalProduct: React.FC<AddModalProps<TypeProductFormValue>> = ({
                                                                                 isOpen,
                                                                                 addItem,
                                                                                 onCancel,
                                                                               }) => {
  const [form] = Form.useForm();

  // Все единицы измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>([]);

  // Товарные группы
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

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
    <Modal
      title={`Добавление нового товара`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={700}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
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
    </Modal>
  )
}