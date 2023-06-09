import React, {useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {UpdateDrawerProps, TypeEmployee} from "../../../types";
import {getEmployeeById} from "../../../services";
import {FormEmployee} from "./FormEmployee";
import {useFormHandler} from "../../../hooks";
import useApi from "../../../hooks/useApi";

export const UpdateDrawerEmployee: React.FC<UpdateDrawerProps<TypeEmployee>> = ({
                                                                                  isOpen,
                                                                                  selectedItemId,
                                                                                  onCancel,
                                                                                  updateItem,
                                                                                }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  const {sendRequest} = useApi();

  // Функция для получения данных в дравер
  const handleGetEmployee = useCallback((): void => {
    if (selectedItemId) {
      sendRequest(() => getEmployeeById(selectedItemId)).then((data) => {
        form.setFieldsValue({...data});
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetEmployee()
    }
  }, [isOpen, selectedItemId, handleGetEmployee]);

  return (
    <Drawer
      title="Редактирование сотрудника"
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
      <FormEmployee
        form={form}
      />
    </Drawer>
  )
}