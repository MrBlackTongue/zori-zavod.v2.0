import React, {useState, useEffect} from "react";
import {AddModalProps, TypeOperation, TypeOperationAccounting, TypeOutput, TypeProductionArea} from "../../../types";
import {DatePicker, Form, InputNumber, Modal, Select} from "antd";
import {getAllOperation, getAllOutput, getAllProductionArea} from "../../../services";
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

  // Все типы производства, выбранный тип производства
  const [allProductionArea, setAllProductionArea] = useState<TypeProductionArea[]>();
  const [selectedProductionArea, setSelectedProductionArea] = useState<TypeProductionArea>();

  // Все выпуски продукции, выбранный выпуск продукции, отфильтрованные выпуски продукции
  const [allOutput, setAllOutput] = useState<TypeOutput[]>();
  const [selectedOutput, setSelectedOutput] = useState<TypeOutput>();
  const [filteredOutput, setFilteredOutput] = useState<TypeOutput[]>([]);

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

  // Очистить поле операция
  const onClearOperation = (): void => {
    form.setFieldsValue({operation: undefined});
    setSelectedOperation(undefined);
  }

  // Изменить выбранный тип производства
  const onChangeProductionArea = (values: string, option: any): TypeProductionArea => {
    const productionType: TypeProductionArea = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({productionType: productionType});
    setSelectedProductionArea(productionType)
    return productionType
  };

  // Очистить поле
  const onClearProductionArea = (): void => {
    form.setFieldsValue({productionType: undefined});
    setSelectedProductionArea(undefined);
  }

  // Изменить выбранный выпуск продукции
  const onChangeOutput = (value: string): TypeOutput | undefined => {
    const selectedOutput = allOutput?.find(output => output.id === parseInt(value));
    form.setFieldsValue({
      output: selectedOutput
    });
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

  // Функция подтверждения добавления
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedOperation(undefined);
        setSelectedOutput(undefined);
        setSelectedProductionArea(undefined);
        addItem({...values, output: values.output || null, fact: values.fact || null});
        onSearchOutput('');
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }

  // Функция закрытия модального окна
  const handleClose = () => {
    form.resetFields();
    setSelectedOperation(undefined);
    setSelectedOutput(undefined);
    setSelectedProductionArea(undefined);
    onCancel()
  };

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
    getAllProductionArea().then((allProductionArea) => {
      setAllProductionArea(allProductionArea);
    });
  }, []);

  return (
    <Modal
      title={`Добавление новой учетной операции`}
      open={isOpen}
      onCancel={handleClose}
      width={650}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{
          modifier: 'public',
          output: null,
          fact: null,
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
              value={
                selectedOutput
                  ? `${dayjs(selectedOutput?.date).format('DD.MM.')}, ${
                    selectedOutput?.product?.title
                  }, ID: ${selectedOutput.id}`
                  : undefined
              }
              onChange={onChangeOutput}
              onSearch={onSearchOutput}
            >
              {filteredOutput && filteredOutput.length > 0
                ? filteredOutput.map((output) => (
                  <Option id={output.id} key={output.id} value={output.id} date={output?.date}>
                    {`${dayjs(output?.date).format('DD.MM.')}, ${output?.product?.title}, ID: ${output.id}`}
                  </Option>
                ))
                : null}
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
          rules={[{type: 'object' as const, required: true, message: 'выберите тип'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
              value={selectedProductionArea ? selectedProductionArea?.title : undefined}
              onChange={onChangeProductionArea}
              onClear={onClearProductionArea}
            >
              {allProductionArea && allProductionArea.length > 0 ?
                allProductionArea.map(productionArea => (
                  <Option id={productionArea.id} key={productionArea.id} value={productionArea.title}>
                    {productionArea.title}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}