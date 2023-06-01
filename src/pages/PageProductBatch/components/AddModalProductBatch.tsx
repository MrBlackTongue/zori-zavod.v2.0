import React, {useState, useEffect} from "react";
import {AddModalProps, TypeProduct, TypeProductBatchFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {getAllProduct} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormProductBatch} from "./FormProductBatch";

export const AddModalProductBatch: React.FC<AddModalProps<TypeProductBatchFormValue>> = ({
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
      title={`Добавление новой партии товаров`}
      open={isOpen}
      width={500}
      onOk={handleSubmit}
      onCancel={handleReset}
      okText={"Сохранить"}
      cancelText={"Отмена"}
    >
      <FormProductBatch
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeProduct}
        onClearProduct={onClearProduct}
        onSearchProduct={onSearchProduct}
      />
    </Modal>
  );
};