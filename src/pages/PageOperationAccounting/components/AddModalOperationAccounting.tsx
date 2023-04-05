import React, {useEffect, useState} from "react";
import {AddModalProps, TypeOperation, TypeOperationAccounting, TypeOutput} from "../../../types";
import {DatePicker, Form, InputNumber, Modal, Select} from "antd";
import {getAllOperation, getAllOutput} from "../../../services";
import dayjs from "dayjs";

const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY';

export const AddModalOperationAccounting: React.FC<AddModalProps<TypeOperationAccounting>> = ({
                                                                                                isOpen,
                                                                                                addItem,
                                                                                                onCancel,
                                                                                              }) => {
  const [form] = Form.useForm();

  // Все операции, выбранная операция
  const [allOperation, setAllOperation] = useState<TypeOperation[]>();
  const [selectedOperation, setSelectedOperation] = useState<TypeOperation>();

  // Все выпуски продукции, выбранный выпуск продукции
  const [allOutput, setAllOutput] = useState<TypeOutput[]>();
  const [selectedOutput, setSelectedOutput] = useState<TypeOutput>();

  // Изменить выбранную операцию
  const onChangeOperation = (values: string, option: any): TypeOperation => {
    const operation: TypeOperation = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      operation: operation
    });
    setSelectedOperation(operation)
    return operation
  };

  // Изменить выбранный выпуск продукции
  const onChangeOutput = (value: string): TypeOutput | undefined => {
    const selectedOutput = allOutput?.find(output => output.id === parseInt(value));
    form.setFieldsValue({
      output: selectedOutput
    });
    setSelectedOutput(selectedOutput);
    return selectedOutput;
  };

  // Функция подтверждения добавления новой учетной операции
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedOperation(undefined);
        setSelectedOutput(undefined);
        addItem(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }

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

  return (
    <Modal
      title={`Добавление новой учетной операции`}
      open={isOpen}
      onCancel={() => {
        setSelectedOperation(undefined);
        setSelectedOutput(undefined);
        onCancel()
      }}
      width={700}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{
          modifier: 'public'
        }}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Операция"
          name="operation"
          rules={[{type: 'object' as const, required: true, message: 'выберите операцию'}]}
        >
          <div>
            <Select
              value={selectedOperation ? selectedOperation?.title : undefined}
              onChange={onChangeOperation}
            >
              {allOperation && allOperation.length > 0 ?
                allOperation.map(operation => (
                  <Option id={operation.id} key={operation.id} value={operation.title}>
                    {operation.title}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Выпуск продукции"
          name="output"
          rules={[{type: 'object' as const, required: true, message: 'выберите выпуск продукции'}]}
        >
          <div>
            <Select
              value={selectedOutput ? (`${dayjs(selectedOutput?.date).format('DD.MM.')}, ${selectedOutput?.product?.title}, ID: ${selectedOutput.id}`) : undefined}
              onChange={onChangeOutput}
            >
              {allOutput && allOutput.length > 0 ?
                allOutput.map(output => (
                  <Option id={output.id} key={output.id} value={output.id} date={output?.date}>
                    {`${dayjs(output?.date).format('DD.MM.')}, ${output?.product?.title}, ID: ${output.id}`}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Факт"
          name="fact"
          rules={[{required: true, message: "введите факт"}]}
        >
          <InputNumber style={{width: "100%"}}/>
        </Form.Item>
        <Form.Item
          label="Дата"
          name="date"
          rules={[{type: 'object' as const, required: true, message: 'выберите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            format={dateFormatUser}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}