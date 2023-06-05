import React, {useState, useEffect} from "react";
import {AddModalProps, TypeProductionProductMovementFormValue, TypeStock} from "../../../types";
import {Form, InputNumber, message, Modal, Select} from "antd";
import {getAllStock} from "../../../services";
import {useFormSelect, useFormHandler} from "../../../hooks";

const {Option} = Select;

export const AddModalProductionProductMovement:
  React.FC<AddModalProps<TypeProductionProductMovementFormValue>> = ({
                                                                       isOpen,
                                                                       addItem,
                                                                       onCancel,
                                                                     }) => {
  const [form] = Form.useForm();

  // Все остатки на складе
  const [allStock, setAllStock] = useState<TypeStock[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем stock
  const {
    onChangeSelect: onChangeStock,
    onClearSelect: onClearStock,
    onSearchSelect: onSearchStock,
  } = useFormSelect(form, 'stock');

  // Функция подтверждения добавления
  const preSubmitValidation = (): boolean => {
    const enteredAmount = form.getFieldValue("amount");
    const enteredIncome = form.getFieldValue('income')
    const selectedStockId = form.getFieldValue("stock");
    const selectedStock = allStock.find(stock => stock.id === selectedStockId);

    if (selectedStock?.amount === 0 && !enteredIncome) {
      void message.warning("Выбранного товара не осталось на складе")
      return false
    }
    if (enteredAmount && selectedStock?.amount && enteredAmount > selectedStock.amount && !enteredIncome) {
      void message.warning("Введенное количество превышает количество товара на складе")
      return false
    }
    return true;
  }

  // Обработчик подтверждения добавления нового товара
  const handleOk = (): void => {
    if (preSubmitValidation()) {
      handleSubmit();
    }
  };

  useEffect(() => {
    getAllStock().then((allStock) => {
      setAllStock(allStock);
    });
  }, [onCancel]);

  return (
    <Modal
      title={`Добавление движения товара на производстве`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={600}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleReset}
    >
      <Form
        form={form}
        initialValues={{income: false}}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Товар на складе"
          name="stock"
          rules={[{required: true, message: 'выберите товар'}]}
        >
          <Select
            showSearch
            allowClear
            onChange={onChangeStock}
            onClear={onClearStock}
            filterOption={onSearchStock}
          >
            {allStock && allStock.length > 0
              ? allStock.map((stock) => (
                <Option key={stock.id} value={stock.id} label={`${stock.product?.title}, ${stock.id}`}>
                  {`${stock.product?.title}, ID: ${stock.id}, ${stock?.amount}`}
                </Option>
              ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item
          label="Количество"
          name="amount"
          rules={[{required: true, message: 'введите количество'}]}
        >
          <InputNumber style={{width: "100%"}}/>
        </Form.Item>
        <Form.Item
          label="Тип движения"
          name="income"
        >
          <Select
            defaultValue={false}
            onChange={value => form.setFieldsValue({income: value})}
          >
            <Option id={true} value={true}>{'Приход'}</Option>
            <Option id={false} value={false}>{'Расход'}</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}