import React from "react";
import {CreateModalProps, TypePurchaseFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormPurchase} from "./FormPurchase";

export const CreateModalPurchase: React.FC<CreateModalProps<TypePurchaseFormValue>> = ({
                                                                                         isOpen,
                                                                                         createItem,
                                                                                         onCancel,
                                                                                       }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allProduct} = useFetchAllData({depsProduct: isOpen});

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

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