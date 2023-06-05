import React from "react";
import {CreateModalProps, TypeOperationAccountingFormValue} from "../../../types";
import {Form, Modal} from "antd";
import {useFetchAllData, useFormSelect, useFormHandler} from "../../../hooks";
import {FormOperationAccounting} from "./FormOperationAccounting";

export const CreateModalOperationAccounting:
  React.FC<CreateModalProps<TypeOperationAccountingFormValue>> = ({
                                                                    isOpen,
                                                                    createItem,
                                                                    onCancel,
                                                                  }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allOperation, allProductionType, allOutput} = useFetchAllData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

  // Хук для управления полем operation
  const {
    onChangeSelect: onChangeOperation,
    onClearSelect: onClearOperation,
    onSearchSelect: onSearchOperation,
  } = useFormSelect(form, 'operation');

  // Хук для управления полем output
  const {
    onChangeSelect: onChangeOutput,
    onClearSelect: onClearOutput,
    onSearchSelect: onSearchOutput,
  } = useFormSelect(form, 'output');

  // Хук для управления полем productionType
  const {
    onChangeSelect: onChangeProductionType,
    onClearSelect: onClearProductionType,
    onSearchSelect: onSearchProductionType,
  } = useFormSelect(form, 'productionType');

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