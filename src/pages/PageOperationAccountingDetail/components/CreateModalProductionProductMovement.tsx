import React, {useState, useEffect} from "react";
import {CreateModalProps, TypeProductionProductMovementFormValue, TypeStock} from "../../../types";
import {Form, InputNumber, message, Modal, Select, Tooltip} from "antd";
import {getAllStock} from "../../../services";
import {useFormSelect, useFormHandler} from "../../../hooks";

export const CreateModalProductionProductMovement:
  React.FC<CreateModalProps<TypeProductionProductMovementFormValue>> = ({
                                                                          isOpen,
                                                                          createItem,
                                                                          onCancel,
                                                                        }) => {
  const [form] = Form.useForm();
  const {Option} = Select;

  // Все остатки на складе
  const [allStock, setAllStock] = useState<TypeStock[]>([]);

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

  // Хук для управления полем stock
  const {onChangeSelect, onClearSelect, onSearchSelect} = useFormSelect(form, 'stock');

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
  }, [isOpen]);

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
            placeholder='Выберите товар'
            onChange={onChangeSelect}
            onClear={onClearSelect}
            filterOption={onSearchSelect}
          >
            {allStock && allStock.length > 0
              ? allStock.map((stock) => (
                <Option key={stock.id} value={stock.id} label={`${stock.product?.title}, ${stock.id}`}>
                  <Tooltip placement="right" title={`${stock.product?.title}, ID: ${stock.id}, ${stock?.amount}`}>
                    {`${stock.product?.title}, ID: ${stock.id}, ${stock?.amount}`}
                  </Tooltip>
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
          <InputNumber placeholder='1' style={{width: "100%"}} min={1}/>
        </Form.Item>
        <Form.Item
          label="Тип движения"
          name="income"
        >
          <Select
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