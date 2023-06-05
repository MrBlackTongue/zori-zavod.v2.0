import React from "react";
import {AddModalProps, TypeStockFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormStock} from "./FormStock";

export const AddModalStock: React.FC<AddModalProps<TypeStockFormValue>> = ({
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
        onChangeProduct={onChangeSelect}
        onClearProduct={onClearSelect}
        onSearchProduct={onSearchSelect}
      />
    </Modal>
  );
};