import React, {useCallback, useEffect, useState} from "react";
import {Form, Drawer, Select, InputNumber, Space, Button} from "antd";
import {EditDrawerProps, TypeProduct, TypeStock} from "../../../types";
import {getAllStock, getPurchaseById} from "../../../services";

const {Option} = Select;

export const EditDrawerStock: React.FC<EditDrawerProps<TypeStock>> = ({
                                                                              isOpen,
                                                                              selectedItemId,
                                                                              closeDrawer,
                                                                              updateItem,
                                                                            }) => {
  const [form] = Form.useForm();

  // товар на складе
  const [product] = useState<TypeStock | null>(null);

  // Все товары, выбранный товар, товар
  const [allStock, setAllStock] = useState<TypeStock[]>();
  const [selectedStock, setSelectedStock] = useState<TypeStock>();
  const [stock, setStock] = useState<TypeStock>();

  // Изменить выбранный товар со склада
  const onChangeStock = (values: string, option: any): TypeStock => {
    const product: TypeProduct = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      product: product.id,
    });
    setSelectedStock(product)
    return product
  };

  // Функция для получения данных об остатках по id и обновления формы
  const handleGetPurchaseById = useCallback(() => {
    if (selectedItemId) {
      getPurchaseById(selectedItemId).then((stock) => {
        form.setFieldsValue({
          stock: stock?.product?.id,
          amount: product?.amount,
        });
        setSelectedStock(stock?.product)
        setStock(stock?.product)
      })
    }
  }, [selectedItemId]);

  useEffect(() => {
    getAllStock().then((stock) => {
      setAllStock(stock);
    });
  }, []);

  useEffect(() => {
    handleGetPurchaseById();
  }, [selectedItemId, handleGetPurchaseById]);

  return (
    <Drawer
      title="Редактирование ячейки на складе"
      width={600}
      open={isOpen}
      onClose={() => {
        closeDrawer()
        setSelectedStock(stock)
      }}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={() => {
            closeDrawer()
            setSelectedStock(stock)
          }}>Отмена</Button>
          <Button onClick={() => {
            closeDrawer()
            form
              .validateFields()
              .then((values) => {
                updateItem(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
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
      >
        <Form.Item
          label="Товар"
          name="product"
          rules={[{required: true, message: "выберите товар"}]}
        >
          <div>
            <Select
              value={selectedStock ? selectedStock?.product?.title : undefined}
              onChange={onChangeStock}
            >
              {allStock && allStock.length > 0 ?
                allStock.map(stock => (
                  <Option id={stock?.product?.id} key={stock?.product?.id} value={stock?.product?.title}>
                    {stock?.product?.title}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Количество"
          name="amount"
          rules={[{required: true, message: "введите количество"}]}
        >
          <InputNumber style={{width: '100%'}}/>
        </Form.Item>
      </Form>
    </Drawer>
  )
}