import React from "react";
import {CreateModalProps, TypeStockFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormStock} from "./FormStock";

export const CreateModalStock: React.FC<CreateModalProps<TypeStockFormValue>> = ({
                                                                                   isOpen,
                                                                                   createItem,
                                                                                   onCancel,
                                                                                 }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allProduct, allStoragePlace} = useFetchAllData({depsProduct: isOpen, depsStoragePlace: isOpen});

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

  // Хук для управления полем product
  const {
    onChangeSelect: onChangeProduct,
    onClearSelect: onClearProduct,
    onSearchSelect: onSearchProduct
  } = useFormSelect(form, 'product');

  // Хук для управления полем storagePlace
  const {
    onChangeSelect: onChangeStoragePlace,
    onClearSelect: onClearStoragePlace,
    onSearchSelect: onSearchStoragePlace
  } = useFormSelect(form, 'storagePlace');

  return (
    <Modal
      title={`Добавление новой ячейки остатков`}
      okText={"Сохранить"}
      cancelText={"Отмена"}
      width={600}
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
        allStoragePlace={allStoragePlace}
        onChangeStoragePlace={onChangeStoragePlace}
        onClearStoragePlace={onClearStoragePlace}
        onSearchStoragePlace={onSearchStoragePlace}
      />
    </Modal>
  );
};