import React from "react";
import {Form, Modal} from "antd";
import {CreateModalProps, TypeMeterRecordFormValue} from "../../../types";
import {useFetchAllData, useFormHandler, useFormSelect} from "../../../hooks";
import {FormMeterRecord} from "./FormMeterRecord";

export const CreateModalMeterRecord: React.FC<CreateModalProps<TypeMeterRecordFormValue>> = ({
                                                                                               isOpen,
                                                                                               createItem,
                                                                                               onCancel,
                                                                                             }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allMeter} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

  // Хук для управления полем meterDto
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'meterDto');

  return (
    <Modal
      title={`Добавление новой записи счетчика`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={700}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormMeterRecord
        form={form}
        allMeter={allMeter}
        onChangeMeter={onChangeSelect}
        onClearMeter={onClearSelect}
        onSearchMeter={onSearchSelect}
      />
    </Modal>
  )
}