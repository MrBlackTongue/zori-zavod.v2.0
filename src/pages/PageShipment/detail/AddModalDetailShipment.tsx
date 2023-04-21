import React, {useEffect, useState} from "react";
import {AddModalProps, TypeStock} from "../../../types";
import {Form, Modal, Select} from "antd";
import {getAllStocks} from "../../../services";
import {TypeShipmentProductMovement} from "../../../types/TypeShipmentProductMovement";

const dateFormatUser = 'DD.MM.YYYY';
const {Option} = Select;


export const AddModalDetailShipment: React.FC<AddModalProps<TypeShipmentProductMovement>> = ({
                                                                                               isOpen,
                                                                                               addItem,
                                                                                               onCancel,
                                                                                             }) => {
  const [form] = Form.useForm();

  // Все товары, выбранный товар
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

  useEffect(() => {
    getAllStocks().then((stocks) => {
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

      <Form.Item
        label="Склад"
        name="stock"
        rules={[{required: true, message: 'выберите клиента'}]}
      >
        <div>
          <Select
            value={selectedStock ? selectedStock.product?.title : undefined}
            onChange={onChangeStock}
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

    </Modal>
  )
}