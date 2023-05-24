import React, {useState, useEffect} from "react";
import {Button, DatePicker, Drawer, Form, InputNumber, Select, Space} from "antd";
import {EditDrawerProps, TypeOutput, TypeOperation, TypeOperationAccounting, TypeProductionType} from "../../../types";
import {getAllOutput, getAllOperation, getOperationAccountingById, getAllProductionType} from "../../../services";
import dayjs from "dayjs";

const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY';

export const EditDrawerOperationAccounting:
  React.FC<EditDrawerProps<TypeOperationAccounting>> = ({
                                                          isOpen,
                                                          selectedItemId,
                                                          closeDrawer,
                                                          updateItem,
                                                        }) => {
  const [form] = Form.useForm();

  // Все операции, выбранная операция
  const [allOperation, setAllOperation] = useState<TypeOperation[]>();
  const [selectedOperation, setSelectedOperation] = useState<TypeOperation>();

  // Все типы производства, выбранный тип производства
  const [allProductionType, setAllProductionType] = useState<TypeProductionType[]>();
  const [selectedProductionType, setSelectedProductionType] = useState<TypeProductionType>();

  // Все выпуски продукции, Выбранный выпуск продукции, отфильтрованные выпуски продукции
  const [allOutput, setAllOutput] = useState<TypeOutput[]>();
  const [selectedOutput, setSelectedOutput] = useState<TypeOutput>();
  const [filteredOutput, setFilteredOutput] = useState<TypeOutput[]>([]);

  // Изменить выбранную операцию
  const onChangeOperation = (values: string, option: any): TypeOperation => {
    const operation: TypeOperation = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({operation: operation});
    setSelectedOperation(operation)
    return operation
  };

  // Очистить поле операция
  const onClearOperation = (): void => {
    form.setFieldsValue({operation: undefined});
    setSelectedOperation(undefined);
  }

  // Изменить выбранный тип производства
  const onChangeProductionType = (values: string, option: any): TypeProductionType | undefined => {
    if (values === undefined) {
      setSelectedProductionType(undefined);
      form.setFieldsValue({productionType: undefined});
      return undefined;
    }
    const productionType: TypeProductionType = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({productionType: productionType});
    setSelectedProductionType(productionType)
    return productionType
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
        if (typeof values.operation === 'string') {
          values.operation = selectedOperation;
        }
        if (typeof values.productionType === 'string') {
          values.productionType = selectedProductionType;
        }
        updateItem(values);
        closeDrawer()
        onSearchOutput('')
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
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
      productionType: operationAccounting?.productionType,
    });
    setSelectedOperation(operationAccounting?.operation);
    setSelectedOutput(operationAccounting?.output);
    setSelectedProductionType(operationAccounting?.productionType)
  }

  useEffect(() => {
    if (selectedItemId) {
      getOperationAccounting(selectedItemId).catch((error) => console.error(error));
    } else {
      setSelectedOperation(undefined);
      setSelectedOutput(undefined);
      setSelectedProductionType(undefined);
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

  useEffect(() => {
    getAllProductionType().then((allProductionType) => {
      setAllProductionType(allProductionType);
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
          rules={[{required: true, message: 'выберите операцию'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
              value={selectedOperation ? selectedOperation?.title : undefined}
              onChange={onChangeOperation}
              onClear={onClearOperation}
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
        <Form.Item
          label="Тип производства"
          name="productionType"
          rules={[{required: true, message: 'выберите тип'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
              value={selectedProductionType ? selectedProductionType?.title : undefined}
              onChange={onChangeProductionType}
            >
              {allProductionType && allProductionType.length > 0 ?
                allProductionType.map(productionType => (
                  <Option id={productionType.id} key={productionType.id} value={productionType.title}>
                    {productionType.title}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  )
}