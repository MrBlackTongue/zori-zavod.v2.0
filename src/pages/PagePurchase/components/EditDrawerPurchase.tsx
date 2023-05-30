import React, {useState, useEffect, useCallback} from "react";
import {Form, Drawer, Select, InputNumber, DatePicker, Checkbox, Space, Button} from "antd";
import {EditDrawerProps, TypeProduct, TypePurchase} from "../../../types";
import {getAllProduct, getPurchaseById} from "../../../services";
import dayjs, {Dayjs} from 'dayjs';
import {CheckboxChangeEvent} from "antd/es/checkbox";

const {Option} = Select;

export const EditDrawerPurchase: React.FC<EditDrawerProps<TypePurchase>> = ({
                                                                              isOpen,
                                                                              selectedItemId,
                                                                              closeDrawer,
                                                                              updateItem,
                                                                            }) => {
  const [form] = Form.useForm();

  // Все товары, выбранный товар, товар
  const [allProduct, setAllProduct] = useState<TypeProduct[]>();
  const [selectedProduct, setSelectedProduct] = useState<TypeProduct>();
  const [product, setProduct] = useState<TypeProduct>();

  // Выбранная дата
  const [selectedDate, setSelectedDate] = useState<Dayjs | null | undefined>();

  // Изменить состояние чекбокса
  const onChangeCheckbox = (e: CheckboxChangeEvent): void => {
    form.setFieldsValue({paid: e.target.checked});
  }

  // Изменить выбранный товар
  const onChangeProduct = (value: string, option: any): void => {
    const product: TypeProduct = {
      id: option.id,
      title: value,
    };
    form.setFieldsValue({product: product});
    setSelectedProduct(product)
  };

  // Функция для получения данных о закупке по id и обновления формы
  const handleGetPurchase = useCallback((): void => {
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
  }, [selectedItemId, form]);

  // Функция подтверждения редактирования
  const handleOk = (): void => {
    closeDrawer()
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      })
  }

  // Функция закрытия дравера
  const handleClose = (): void => {
    closeDrawer()
    setSelectedProduct(product)
  };

  useEffect(() => {
    getAllProduct().then((products) => {
      setAllProduct(products);
    });
  }, []);

  useEffect(() => {
    handleGetPurchase();
  }, [selectedItemId, handleGetPurchase]);

  return (
    <Drawer
      title="Редактирование закупки"
      width={600}
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
              {allProduct && allProduct.length > 0 ?
                allProduct.map(product => (
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
          rules={[{required: true, message: 'выберите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            format='DD.MM.YYYY'
            onChange={(value) => setSelectedDate(value)}
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