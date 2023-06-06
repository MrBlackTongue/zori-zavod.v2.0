import React, {useState, useEffect} from "react";
import {Form, Modal} from "antd";
import {CreateModalProps, TypeProductGroup, TypeProductGroupFormValue} from "../../../types";
import {useFormHandler, useFormSelect} from "../../../hooks";
import {FormProductGroup} from "./FormProductGroup";
import {getAllProductGroup} from "../../../services";

export const CreateModalProductGroup: React.FC<CreateModalProps<TypeProductGroupFormValue>> = ({
                                                                                                 isOpen,
                                                                                                 createItem,
                                                                                                 onCancel,
                                                                                               }) => {
  const [form] = Form.useForm();

  // Все группы товаров
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

  // Хук для управления полем productGroup
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'productGroup');

  useEffect(() => {
    getAllProductGroup().then(allProductGroup => {
      setAllProductGroup(allProductGroup);
    });
  }, [isOpen]);

  return (
    <Modal
      title="Добавление новой группы товаров"
      okText="Сохранить"
      cancelText="Отмена"
      width={680}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormProductGroup
        form={form}
        allProductGroup={allProductGroup}
        onChangeProductGroup={onChangeSelect}
        onClearProductGroup={onClearSelect}
        onSearchProductGroup={onSearchSelect}
      />
    </Modal>
  );
};