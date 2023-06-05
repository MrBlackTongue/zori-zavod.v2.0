import React from "react";
import {AddModalProps, TypePurchaseFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormPurchase} from "./FormPurchase";

export const AddModalPurchase: React.FC<AddModalProps<TypePurchaseFormValue>> = ({
                                                                                   isOpen,
                                                                                   addItem,
                                                                                   onCancel,
                                                                                 }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allProduct} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем product
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'product');

  return (
    <Modal
      title={`Добавление новой закупки`}
      okText={"Сохранить"}
      cancelText={"Отмена"}
      width={500}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormPurchase
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeSelect}
        onClearProduct={onClearSelect}
        onSearchProduct={onSearchSelect}
      />
    </Modal>
  );
};