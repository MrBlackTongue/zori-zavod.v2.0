import React, {useState, useEffect} from "react";
import {AddModalProps, TypeProduct, TypePurchaseFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {getAllProduct} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormPurchase} from "./FormPurchase";

export const AddModalPurchase: React.FC<AddModalProps<TypePurchaseFormValue>> = ({
                                                                                   isOpen,
                                                                                   addItem,
                                                                                   onCancel,
                                                                                 }) => {
  const [form] = Form.useForm();

  // Все товары
  const [allProduct, setAllProduct] = useState<TypeProduct[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем product
  const {
    onChangeField: onChangeProduct,
    onClearField: onClearProduct,
    onSearchField: onSearchProduct,
  } = useFormField(form, 'product');

  useEffect(() => {
    getAllProduct().then((allProduct) => {
      setAllProduct(allProduct);
    });
  }, []);

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
        onChangeProduct={onChangeProduct}
        onClearProduct={onClearProduct}
        onSearchProduct={onSearchProduct}
      />
    </Modal>
  );
};