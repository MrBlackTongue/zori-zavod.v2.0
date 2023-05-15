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

  // Все операции, выбранная операция
  const [allOperation, setAllOperation] = useState<TypeOperation[]>();
  const [selectedOperation, setSelectedOperation] = useState<TypeOperation>();

  // Все выпуски продукции, Выбранный выпуск продукции, отфильтрованные выпуски продукции
  const [allOutput, setAllOutput] = useState<TypeOutput[]>();
  const [selectedOutput, setSelectedOutput] = useState<TypeOutput>();
  const [filteredOutput, setFilteredOutput] = useState<TypeOutput[]>([]);

  // Изменить выбранную операцию
  const onChangeOperation = (values: string, option: any): TypeOperation | undefined => {
    if (values === undefined) {
      setSelectedOperation(undefined);
      form.setFieldsValue({operation: undefined});
      return undefined;
    }
    const operation: TypeOperation = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({operation: operation});
    setSelectedOperation(operation)
    return operation
  };

  // Изменить выбранный выпуск продукции
  const onChangeOutput = (value: string): TypeOutput | undefined => {
    const selectedOutput = allOutput?.find(output => output.id === parseInt(value));
    form.setFieldsValue({output: selectedOutput});
    setSelectedOutput(selectedOutput);
    onSearchOutput('')
    return selectedOutput;
  };

  // Поиск по выпускам продукции
  const onSearchOutput = (searchText: string) => {
    if (searchText === '') {
      setFilteredOutput(allOutput || []);
    } else {
      const searchLowerCase = searchText.toLowerCase();
      const filtered = allOutput?.filter((output) => {
        const titleMatch = output?.product && output.product.title
          ? output.product.title.toLowerCase().includes(searchLowerCase)
          : false;

        const idMatch = output.id?.toString().includes(searchText);
        const dateMatch = output?.date
          ? dayjs(output.date).format('DD.MM.YYYY').includes(searchText)
          : false;

        return titleMatch || idMatch || dateMatch;
      });
      setFilteredOutput(prevState => filtered || prevState);
    }
  };

  // Функция подтверждения редактирования
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
        closeDrawer()
        onSearchOutput('')
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  // Функция закрытия дравера
  const handleClose = () => {
    form.resetFields();
    if (selectedItemId) {
      getOperationAccounting(selectedItemId).catch((error) => console.error(error));
    }
    closeDrawer();
  };

  // Функция для получения информации об учетной записи и установления значений полей формы
  const getOperationAccounting = async (itemId: number) => {
    const operationAccounting = await getOperationAccountingById(itemId);
    form.setFieldsValue({
      date: dayjs(operationAccounting?.date),
      fact: operationAccounting?.fact,
      operation: operationAccounting?.operation,
      output: operationAccounting?.output,
    });
    setSelectedOperation(operationAccounting?.operation);
    setSelectedOutput(operationAccounting?.output);
  }

  useEffect(() => {
    if (selectedItemId) {
      getOperationAccounting(selectedItemId).catch((error) => console.error(error));
    } else {
      setSelectedOperation(undefined);
      setSelectedOutput(undefined);
    }
  }, [selectedItemId]);

  useEffect(() => {
    getAllOperation().then((allOperation) => {
      setAllOperation(allOperation);
    });
  }, []);

  useEffect(() => {
    getAllOutput().then((allOutput) => {
      setAllOutput(allOutput);
      setFilteredOutput(allOutput);
    });
  }, []);

  // Для очистки фильтров выпуска продукции
  useEffect(() => {
    if (!isOpen) {
      setFilteredOutput(allOutput || []);
    }
  }, [isOpen]);

  return (
    <Drawer
      title="Редактирование учетной операции"
      width={700}
      open={isOpen}
      onClose={handleClose}
      extra={
        <Space>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleOk} type="primary" htmlType="submit">
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
      >
        <Form.Item
          label="Операция"
          name="operation"
          rules={[{type: 'object' as const, required: true, message: 'выберите операцию'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
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
        >
          <div>
            <Select
              showSearch
              allowClear
              filterOption={false}
              value={selectedOutput
                ? (
                  `${dayjs(selectedOutput?.date).format('DD.MM.')}, 
                  ${selectedOutput?.product?.title}, ID: ${selectedOutput.id}`
                ) : undefined}
              onChange={onChangeOutput}
              onSearch={onSearchOutput}
            >
              {filteredOutput && filteredOutput.length > 0 ?
                filteredOutput.map(output => (
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
        >
          <InputNumber style={{width: "100%"}} min={0}/>
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
    </Drawer>
  )
}