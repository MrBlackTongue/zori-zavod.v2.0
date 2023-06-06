import React from "react";
import {Form, Modal} from "antd";
import {CreateModalProps, TypeMeterFormValue} from "../../../types";
import {useFetchAllData, useFormHandler, useFormSelect} from "../../../hooks";
import {FormMeter} from "./FormMeter";

export const CreateModalMeter: React.FC<CreateModalProps<TypeMeterFormValue>> = ({
                                                                                   isOpen,
                                                                                   createItem,
                                                                                   onCancel,
                                                                                 }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allMeterType} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

  // Хук для управления полем meterType
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'meterType');

  return (
    <Modal
      title={`Добавление нового счётчика`}
      okText={"Сохранить"}
      cancelText={"Отмена"}
      width={600}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormMeter
        form={form}
        allMeterType={allMeterType}
        onChangeMeterType={onChangeSelect}
        onClearMeterType={onClearSelect}
        onSearchMeterType={onSearchSelect}
      />
    </Modal>
  );
};