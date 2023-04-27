import React, {useEffect, useState} from "react";
import {AddModalProps, TypeStock} from "../../../types";
import {Form, InputNumber, Modal, Select} from "antd";
import {getAllStock} from "../../../services";
import {TypeShipmentProductMovement} from "../../../types/TypeShipmentProductMovement";

const {Option} = Select;


export const AddModalDetailShipment: React.FC<AddModalProps<TypeShipmentProductMovement>> = ({
                                                                                               isOpen,
                                                                                               addItem,
                                                                                               onCancel,
                                                                                             }) => {
  const [form] = Form.useForm();

  // Все товары на складе
  const [allStock, setAllStock] = useState<TypeStock[]>();

  const [selectedStock, setSelectedStock] = useState<TypeStock>();

  // Изменить выбранный товар
  const onChangeStock = (values: string, option: any): TypeStock => {
    const stock: TypeStock = {
      id: option.id,
    };
    form.setFieldsValue({
      stock: stock
    });
    setSelectedStock(stock)
    return stock
  };

  // Очистить поле сток
  const onClearStock = (): void => {
    form.setFieldsValue({operation: undefined});
    setSelectedStock(undefined);
  }

  useEffect(() => {
    getAllStock().then((stocks) => {
      setAllStock(stocks);
    });
  }, []);

  return (
    <Modal
      title={`Добавление нового товара`}
      open={isOpen}
      onCancel={() => {
        onCancel()
        setSelectedStock(undefined)
      }}
      width={500}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log(values)
            form.resetFields();
            setSelectedStock(undefined)
            addItem(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
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
        label="Товар"
        name="stock"
        rules={[{required: true, message: 'выберите клиента'}]}
      >
        <div>
          <Select
            showSearch
            allowClear
            value={selectedStock ? selectedStock.product?.title : undefined}
            onChange={onChangeStock}
            onClear={onClearStock}
          >
            {allStock && allStock.length > 0
              ? allStock.map((stock) => (
                <Option id={stock.id} key={stock.id} value={stock.product?.title}>
                  {stock.product?.title}
                </Option>
              ))
              : null}
          </Select>
        </div>
      </Form.Item>

      <Form.Item
        label="Количество"
        name="amount"
        rules={[{required: true, message: 'введите количество'}]}
      >
        <InputNumber style={{width: "100%"}}/>
      </Form.Item>
      </Form>
    </Modal>
  )
}