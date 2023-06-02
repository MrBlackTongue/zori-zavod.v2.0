import React, {useState, useEffect} from "react";
import {AddModalProps, TypeProduct, TypeStockFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {getAllProduct} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormStock} from "./FormStock";

export const AddModalStock: React.FC<AddModalProps<TypeStockFormValue>> = ({
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
      title={`Добавление новой ячейки на склад`}
      okText={"Сохранить"}
      cancelText={"Отмена"}
      width={500}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormStock
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeProduct}
        onClearProduct={onClearProduct}
        onSearchProduct={onSearchProduct}
      />
    </Modal>
  );
};