import React, {useState, useEffect} from "react";
import {
  AddModalProps,
  TypeOperation,
  TypeOperationAccountingFormValue,
  TypeOutput,
  TypeProductionType
} from "../../../types";
import {Form, Modal} from "antd";
import {getAllOperation, getAllOutput, getAllProductionType} from "../../../services";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormOperationAccounting} from "./FormOperationAccounting";

export const AddModalOperationAccounting:
  React.FC<AddModalProps<TypeOperationAccountingFormValue>> = ({
                                                                 isOpen,
                                                                 addItem,
                                                                 onCancel,
                                                               }) => {
  const [form] = Form.useForm();

  // Все операции, Все типы производства, Все выпуски продукции
  const [allOperation, setAllOperation] = useState<TypeOperation[]>([]);
  const [allProductionType, setAllProductionType] = useState<TypeProductionType[]>([]);
  const [allOutput, setAllOutput] = useState<TypeOutput[]>([]);

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

  useEffect(() => {
    getAllOperation().then((allOperation) => {
      setAllOperation(allOperation);
    });
  }, []);

  useEffect(() => {
    getAllOutput().then((allOutput) => {
      setAllOutput(allOutput);
    });
  }, []);

  useEffect(() => {
    getAllProductionType().then((allProductionType) => {
      setAllProductionType(allProductionType);
    });
  }, []);

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