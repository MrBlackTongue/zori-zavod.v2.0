import {Button, DatePicker, Drawer, Form, InputNumber, Select, Space} from "antd";
import React, {useState, useEffect} from "react";
import {EditDrawerProps, TypeOutput, TypeOperation, TypeOperationAccounting} from "../../../types";
import {getAllOutput, getAllOperation, getOperationAccountingById} from "../../../services";
import dayjs from "dayjs";

const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY';

export const EditDrawerOperationAccounting: React.FC<EditDrawerProps<TypeOperationAccounting>> = ({
                                                                                                    isOpen,
                                                                                                    selectedItemId,
                                                                                                    closeDrawer,
                                                                                                    updateItem,
                                                                                                  }) => {
  const [form] = Form.useForm();

  // Единицы измерения, выбранная единица измерения, единица измерения
  const [allOperation, setAllOperation] = useState<TypeOperation[]>();
  const [selectedOperation, setSelectedOperation] = useState<TypeOperation>();
  const [operation, setOperation] = useState<TypeOperation>()
  const [date, setDate] = useState<any>();

  // Все товарные группы, выбранная товарная группа, товарная группа
  const [allOutput, setAllOutput] = useState<TypeOutput[]>();
  const [selectedOutput, setSelectedOutput] = useState<TypeOutput>();
  const [output, setOutput] = useState<TypeOutput>()

  // Изменить выбранную единицу измерения
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

  // Изменить выбранную товарную группу
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
        updateItem(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
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

  useEffect(() => {
    if (selectedItemId) {
      getOperationAccountingById(selectedItemId).then((operationAccounting) => {
        form.setFieldsValue({
          date: dayjs(operationAccounting?.date),
          fact: operationAccounting?.fact,
        })
        setSelectedOperation(operationAccounting?.operation)
        setOperation(operationAccounting?.operation)
        setSelectedOutput(operationAccounting?.output)
        setOutput(operationAccounting?.output)
        setDate(dayjs(operationAccounting?.date));
      })
    }
  }, [selectedItemId, getOperationAccountingById]);

  return (
    <Drawer
      title="Редактирование учетной записи"
      width={700}
      open={isOpen}
      onClose={() => {
        setSelectedOperation(operation);
        setSelectedOutput(output);
        closeDrawer()
      }}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={() => {
            setSelectedOperation(operation);
            setSelectedOutput(output);
            closeDrawer()
          }}>Отмена</Button>
          <Button onClick={() => {
            closeDrawer()
            handleOk()
          }} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
        initialValues={{
          date: date,
          output: output,
          operation: operation,
        }}
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
            onChange={(value) => {
              setDate(value);
            }}
          />
        </Form.Item>
      </Form>
    </Drawer>
  )
}