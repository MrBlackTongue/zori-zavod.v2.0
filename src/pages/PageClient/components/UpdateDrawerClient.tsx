import React, {useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {UpdateDrawerProps, TypeClientFormValue} from "../../../types";
import {getClientById} from "../../../services";
import {useFormHandler} from "../../../hooks";
import {FormClient} from "./FormClient";

export const UpdateDrawerClient: React.FC<UpdateDrawerProps<TypeClientFormValue>> = ({
                                                                                       isOpen,
                                                                                       selectedItemId,
                                                                                       onCancel,
                                                                                       updateItem,
                                                                                     }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Функция для получения данных в дравер
  const handleGetClient = useCallback((): void => {
    if (selectedItemId) {
      getClientById(selectedItemId).then((client) => {
        form.setFieldsValue({...client});
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetClient()
    }
  }, [isOpen, selectedItemId, handleGetClient]);

  return (
    <Drawer
      title="Редактирование клиента"
      width={600}
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
      <FormClient
        form={form}
      />
    </Drawer>
  )
}