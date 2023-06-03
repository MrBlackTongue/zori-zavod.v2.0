import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Form, Space} from "antd";
import {
  EditDrawerProps,
  TypeOutput,
  TypeOperation,
  TypeProductionType,
  TypeOperationAccountingFormValue
} from "../../../types";
import {getAllOutput, getAllOperation, getOperationAccountingById, getAllProductionType} from "../../../services";
import dayjs from "dayjs";
import {useFormField, useFormHandler} from "../../../hooks";
import {FormOperationAccounting} from "./FormOperationAccounting";

export const EditDrawerOperationAccounting:
  React.FC<EditDrawerProps<TypeOperationAccountingFormValue>> = ({
                                                                   isOpen,
                                                                   selectedItemId,
                                                                   onCancel,
                                                                   updateItem,
                                                                 }) => {
  const [form] = Form.useForm();

  // Все операции, Все типы производства, Все выпуски продукции
  const [allOperation, setAllOperation] = useState<TypeOperation[]>([]);
  const [allProductionType, setAllProductionType] = useState<TypeProductionType[]>([]);
  const [allOutput, setAllOutput] = useState<TypeOutput[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, updateItem, onCancel);

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

  // Функция для получения данных в дравер
  const handleGetOperationAccounting = useCallback((): void => {
    if (selectedItemId) {
      getOperationAccountingById(selectedItemId).then((operationAccounting) => {
        form.setFieldsValue({
          ...operationAccounting,
          date: dayjs(operationAccounting?.date),
          operation: operationAccounting?.operation?.id === 0 ? '' : operationAccounting?.operation?.id,
          output: operationAccounting?.output?.id === 0 ? '' : operationAccounting?.output?.id,
          productionType: operationAccounting?.productionType?.id === 0 ? '' : operationAccounting?.productionType?.id,
        });
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetOperationAccounting()
    }
  }, [isOpen, selectedItemId, handleGetOperationAccounting]);

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
    <Drawer
      title="Редактирование учетной операции"
      width={700}
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
    </Drawer>
  )
}