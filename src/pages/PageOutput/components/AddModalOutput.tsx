import React, {useState, useEffect} from "react";
import {AddModalProps, TypeOutputFormValue, TypeProduct} from "../../../types";
import {Form, Modal} from "antd";
import {getAllProduct} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormOutput} from "./FormOutput";

export const AddModalOutput: React.FC<AddModalProps<TypeOutputFormValue>> = ({
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
      title={`Добавление нового выпуска продукции`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={500}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormOutput
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeProduct}
        onClearProduct={onClearProduct}
        onSearchProduct={onSearchProduct}
      />
    </Modal>
  )
}