import React from "react";
import {AddModalProps, TypeProductFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormProduct} from "./FormProduct";

export const AddModalProduct: React.FC<AddModalProps<TypeProductFormValue>> = ({
                                                                                 isOpen,
                                                                                 addItem,
                                                                                 onCancel,
                                                                               }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allUnit, allProductGroup} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем unit
  const {
    onChangeSelect: onChangeUnit,
    onClearSelect: onClearUnit,
    onSearchSelect: onSearchUnit,
  } = useFormSelect(form, 'unit');

  // Хук для управления полем productGroup
  const {
    onChangeSelect: onChangeProductGroup,
    onClearSelect: onClearProductGroup,
    onSearchSelect: onSearchProductGroup,
  } = useFormSelect(form, 'productGroup');

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