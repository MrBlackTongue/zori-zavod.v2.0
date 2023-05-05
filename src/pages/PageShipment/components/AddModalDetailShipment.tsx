import React, {useEffect, useState} from "react";
import {AddModalProps, TypeStock, TypeShipmentProductMovement} from "../../../types";
import {Form, InputNumber, Modal, Select} from "antd";
import {getAllStock} from "../../../services";
const {Option} = Select;


export const AddModalDetailShipment: React.FC<AddModalProps<TypeShipmentProductMovement>> = ({
                                                                                               isOpen,
                                                                                               addItem,
                                                                                               onCancel,
                                                                                             }) => {
  const [form] = Form.useForm();

  // Состояния для всех товаров на складе и выбранного товара
  const [allStock, setAllStock] = useState<TypeStock[]>();
  const [selectedStock, setSelectedStock] = useState<TypeStock>();

  // Функция изменения выбранного товара
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

  // Функция очистки выбранного товара
  const onClearStock = (): void => {
    form.setFieldsValue({operation: undefined});
    setSelectedStock(undefined);
  }

  // Функция подтверждения добавления нового товара
  const handleOk = () => {
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
  };

  // Функция закрытия модального окна
  const handleClose = () => {
    form.resetFields()
    onCancel()
    setSelectedStock(undefined)
  }

  // Получение списка всех товаров на складе
  useEffect(() => {
    getAllStock().then((stocks) => {
      setAllStock(stocks);
    });
  }, []);

  return (
    <Modal
      title={`Добавление отгруженного товара`}
      open={isOpen}
      onCancel={handleClose}
      width={600}
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
          label="Выберите товар"
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
                    {`${stock.product?.title}, ID: ${stock.id}, ${stock?.amount}`}
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