import React, {useEffect, useCallback, useState} from "react";
import {Form, Drawer, Space, Button} from "antd";
import {UpdateDrawerProps, TypeProductGroupFormValue, TypeProductGroup} from "../../../types";
import {getAllProductGroup, getProductGroupById} from "../../../services";
import {useFormHandler, useFormSelect} from "../../../hooks";
import {FormProductGroup} from "./FormProductGroup";

export const UpdateDrawerProductGroup: React.FC<UpdateDrawerProps<TypeProductGroupFormValue>> = ({
                                                                                                   isOpen,
                                                                                                   selectedItemId,
                                                                                                   updateItem,
                                                                                                   onCancel,
                                                                                                 }) => {
  const [form] = Form.useForm();

  // Все группы товаров
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем productGroup
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'productGroup');

  // Функция для получения данных в дравер
  const handleGetParent = useCallback((): void => {
    if (selectedItemId) {
      getProductGroupById(selectedItemId).then((data) => {
        form.setFieldsValue({
          ...data,
          parent: data?.parent?.id === 0 ? '' : data?.parent?.id,
        });
      });
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetParent();
    }
  }, [isOpen, selectedItemId, handleGetParent]);

  useEffect(() => {
    getAllProductGroup().then(data => {
      setAllProductGroup(data);
    });
  }, [isOpen]);

  return (
    <Drawer
      title={`Редактирование группы товаров`}
      width={680}
      open={isOpen}
      onClose={handleReset}
      extra={
        <Space>
          <Button onClick={handleReset}>Отмена</Button>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <FormProductGroup
        form={form}
        allProductGroup={allProductGroup}
        onChangeProductGroup={onChangeSelect}
        onClearProductGroup={onClearSelect}
        onSearchProductGroup={onSearchSelect}
      />
    </Drawer>
  );
};
