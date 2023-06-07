import React, {useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {UpdateDrawerProps, TypeMeterFormValue} from "../../../types";
import {getMeterById} from "../../../services";
import {useFetchAllData, useFormHandler, useFormSelect} from "../../../hooks";
import {FormMeter} from "./FormMeter";

export const UpdateDrawerMeter: React.FC<UpdateDrawerProps<TypeMeterFormValue>> = ({
                                                                                     isOpen,
                                                                                     onCancel,
                                                                                     updateItem,
                                                                                     selectedItemId,
                                                                                   }) => {

  const [form] = Form.useForm();

  // Хук для получения данных
  const {allMeterType} = useFetchAllData({depsMeterType: isOpen});

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

  // Хук для управления полем meterType
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'meterType');

  // Функция для получения данных в дравер
  const handleGetMeter = useCallback((): void => {
    if (selectedItemId) {
      getMeterById(selectedItemId).then((data) => {
        form.setFieldsValue({
          ...data,
          meterTypeDto: data?.meterTypeDto?.id === 0 ? '' : data?.meterTypeDto?.id,
        })
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetMeter()
    }
  }, [isOpen, selectedItemId, handleGetMeter, form]);

  return (
    <Drawer
      title="Редактирование счетчика"
      width={600}
      open={isOpen}
      onClose={onCancel}
      extra={
        <Space>
          <Button onClick={handleReset}>Отмена</Button>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <FormMeter
        form={form}
        allMeterType={allMeterType}
        onChangeMeterType={onChangeSelect}
        onClearMeterType={onClearSelect}
        onSearchMeterType={onSearchSelect}
      />
    </Drawer>
  );
}