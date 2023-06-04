import React from "react";
import {AddModalProps, TypeAcceptanceFormValue} from "../../../types";
import {DatePicker, Form, InputNumber, Modal, Select, message} from "antd";
import dayjs from "dayjs";
import {useFetchData, useFormField, useFormHandler} from "../../../hooks";

const {Option} = Select;

export const AddModalAcceptance: React.FC<AddModalProps<TypeAcceptanceFormValue>> = ({
                                                                                       isOpen,
                                                                                       addItem,
                                                                                       onCancel,
                                                                                     }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const {allStock, allPurchase, allProductBatch} = useFetchData();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, addItem, onCancel);

  // Хук для управления полем stock
  const {
    onChangeField: onChangeStock,
    onClearField: onClearStock,
    onSearchField: onSearchStock,
  } = useFormField(form, 'stock');

  // Хук для управления полем purchase
  const {
    onChangeField: onChangePurchase,
    onClearField: onClearPurchase,
    onSearchField: onSearchPurchase,
  } = useFormField(form, 'purchase');

  // Хук для управления полем productBatch
  const {
    onChangeField: onChangeProductBatch,
    onClearField: onClearProductBatch,
    onSearchField: onSearchProductBatch,
  } = useFormField(form, 'productBatch');

  const preSubmitValidation = (): boolean => {
    const selectedStock = form.getFieldValue('stock');
    const selectedPurchase = form.getFieldValue('purchase');

    if (selectedStock && selectedPurchase) {
      const selectedStockItem = allStock.find(stock => stock.id === selectedStock);
      const selectedPurchaseItem = allPurchase.find(purchase => purchase.id === selectedPurchase);

      if (selectedStockItem?.product?.id !== selectedPurchaseItem?.product?.id) {
        void message.warning("Товар в закупке и на складе отличается");
        return false;
      }
    }
    return true;
  }

  // Обработчик подтверждения добавления новой приемки товаров
  const handleOk = (): void => {
    if (preSubmitValidation()) {
      handleSubmit();
    }
  };

  return (
    <Modal
      title={`Добавление новой приемки`}
      okText={"Сохранить"}
      cancelText={"Отмена"}
      width={600}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleReset}
    >
      <Form
        form={form}
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
          label="Закупка"
          name="purchase"
          rules={[{required: true, message: 'выберите закупку'}]}
        >
          <Select
            showSearch
            allowClear
            onChange={onChangePurchase}
            onClear={onClearPurchase}
            filterOption={onSearchPurchase}
          >
            {allPurchase && allPurchase.length > 0
              ? allPurchase.map((purchase) => (
                <Option
                  key={purchase.id}
                  value={purchase.id}
                  label={`${purchase.product?.title}, ${purchase.id}, ${purchase.date}`}
                  title={
                    `${dayjs(purchase.date).format('DD.MM.YYYY')} ID: 
                    ${purchase.id} ${purchase.product?.title}`
                  }
                >
                  {`${dayjs(purchase.date).format('DD.MM.YYYY')} ID: ${purchase.id} ${purchase.product?.title}`}
                </Option>
              ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item
          label="Партия товара"
          name="productBatch"
          rules={[{required: true, message: 'выберите партию товара'}]}
        >
          <Select
            showSearch
            allowClear
            onChange={onChangeProductBatch}
            onClear={onClearProductBatch}
            filterOption={onSearchProductBatch}
          >
            {allProductBatch && allProductBatch.length > 0
              ? allProductBatch.map((productBatch) => (
                <Option
                  key={productBatch.id}
                  value={productBatch.id}
                  label={`${productBatch.product?.title}, ${productBatch.id}`}
                >
                  {`${productBatch.product?.title}`}
                </Option>
              ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item
          label="Количество"
          name="amount"
          rules={[{required: true, message: "введите количество"}]}
        >
          <InputNumber style={{width: "100%"}}/>
        </Form.Item>
        <Form.Item
          label="Дата"
          name="date"
          rules={[{required: true, message: 'выберите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            format={'DD.MM.YYYY'}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};