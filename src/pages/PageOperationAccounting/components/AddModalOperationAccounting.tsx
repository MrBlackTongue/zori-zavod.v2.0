import React from "react";
import {AddModalProps, TypeOperationAccountingFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchData, useFormField, useFormHandler} from "../../../hooks";
import {FormOperationAccounting} from "./FormOperationAccounting";

export const AddModalOperationAccounting:
  React.FC<AddModalProps<TypeOperationAccountingFormValue>> = ({
                                                                 isOpen,
                                                                 addItem,
                                                                 onCancel,
                                                               }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allOperation, allProductionType, allOutput} = useFetchData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем operation
  const {
    onChangeField: onChangeOperation,
    onClearField: onClearOperation,
    onSearchField: onSearchOperation,
  } = useFormField(form, 'operation');

  // Хук для управления полем output
  const {
    onChangeField: onChangeOutput,
    onClearField: onClearOutput,
    onSearchField: onSearchOutput,
  } = useFormField(form, 'output');

  // Хук для управления полем productionType
  const {
    onChangeField: onChangeProductionType,
    onClearField: onClearProductionType,
    onSearchField: onSearchProductionType,
  } = useFormField(form, 'productionType');

  return (
    <Modal
      title={`Добавление новой учетной операции`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={650}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <FormOperationAccounting
        form={form}
        allOperation={allOperation}
        onChangeOperation={onChangeOperation}
        onClearOperation={onClearOperation}
        onSearchOperation={onSearchOperation}
        allOutput={allOutput}
        onChangeOutput={onChangeOutput}
        onClearOutput={onClearOutput}
        onSearchOutput={onSearchOutput}
        allProductionType={allProductionType}
        onChangeProductionType={onChangeProductionType}
        onClearProductionType={onClearProductionType}
        onSearchProductionType={onSearchProductionType}
      />
    </Modal>
  )
}