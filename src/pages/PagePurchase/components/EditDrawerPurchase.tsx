import React, {useCallback, useEffect, useState} from "react";
import {Form, Drawer, Select, InputNumber, DatePicker, Checkbox, Space, Button} from "antd";
import {EditItemProps, ProductType, PurchaseType} from "../../../types";
import {getAllProducts, getPurchaseById} from "../../../services";
import dayjs, {Dayjs} from 'dayjs';
import {CheckboxChangeEvent} from "antd/es/checkbox";

const {Option} = Select;

export const EditDrawerPurchase: React.FC<EditItemProps<PurchaseType>> = ({
                                                                            isOpen,
                                                                            selectedItemId,
                                                                            closeDrawer,
                                                                            updateItem,
                                                                          }) => {
  const [form] = Form.useForm();

  const [purchase] = useState<PurchaseType | null>(null);

  const [products, setProducts] = useState<ProductType[]>();
  const [selectedProduct, setSelectedProduct] = useState<ProductType>();
  const [product, setProduct] = useState<ProductType>();

  const [selectedDate, setSelectedDate] = useState<Dayjs | null | undefined>();

  const [paid, setPaid] = useState(purchase?.paid)

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    setPaid(e.target.checked);
    form.setFieldsValue({paid: e.target.checked});
  }

  const onChangeProduct = (values: string, option: any): ProductType => {
    const product: ProductType = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      product: product.id,
    });
    setSelectedProduct(product)
    return product
  };

  const handleGetPurchaseById = useCallback(() => {
    if (selectedItemId) {
      getPurchaseById(selectedItemId).then((purchase) => {
        form.setFieldsValue({
          date: dayjs(purchase?.date),
          product: purchase?.product?.id,
          cost: purchase?.cost,
          amount: purchase?.amount,
          paid: purchase?.paid,
        });
        setSelectedProduct(purchase?.product)
        setProduct(purchase?.product)
        setSelectedDate(dayjs(purchase?.date));
      })
    }
  }, [selectedItemId]);

  useEffect(() => {
    getAllProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  useEffect(() => {
    handleGetPurchaseById();
  }, [selectedItemId, handleGetPurchaseById]);

  return (
    <Drawer
      title="Редактирование закупки"
      width={600}
      open={isOpen}
      onClose={() => {
        closeDrawer()
        setSelectedProduct(product)
      }}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={() => {
            closeDrawer()
            setSelectedProduct(product)
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
          }} type="primary" form='change-purchase' htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        id='change-purchase'
        form={form}
        name="change-purchase"
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
        initialValues={{date: selectedDate}}
      >
        <Form.Item
          label="Товар"
          name="product"
          rules={[{required: true, message: "выберите товар"}]}
        >
          <div>
            <Select
              value={selectedProduct ? selectedProduct.title : undefined}
              onChange={onChangeProduct}
            >
              {products && products.length > 0 ?
                products.map(product => (
                  <Option id={product.id} key={product.id} value={product.title}>
                    {product.title}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Цена"
          name="cost"
          rules={[{required: true, message: "введите цену"}]}
        >
          <InputNumber style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
          label="Количество"
          name="amount"
          rules={[{required: true, message: "введите количество"}]}
        >
          <InputNumber style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
          label="Дата"
          name="date"
          rules={[{type: 'object' as const, required: true, message: 'выберите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            format='DD.MM.YYYY'
            onChange={(value) => {
              setSelectedDate(value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="paid"
          wrapperCol={{offset: 8, span: 16}}
          valuePropName='checked'
        >
          <Checkbox onChange={onChangeCheckbox}>Оплачено</Checkbox>
        </Form.Item>
      </Form>
    </Drawer>
  )
}