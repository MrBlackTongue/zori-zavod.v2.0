import React, {useCallback, useEffect, useState} from "react";
import {Button, DatePicker, Drawer, Form, Select, Space} from "antd";
import {EditDrawerProps, TypeOutput, TypeProduct} from "../../../types";
import {getOutputById, getAllProduct} from "../../../services";
import dayjs from 'dayjs';

const {Option} = Select;

export const EditDrawerOutput: React.FC<EditDrawerProps<TypeOutput>> = ({
                                                                          isOpen,
                                                                          selectedItemId,
                                                                          closeDrawer,
                                                                          updateItem,
                                                                        }) => {
  const [form] = Form.useForm();

  // Все товары, выбранный товар, товар, дата
  const [allProduct, setAllProduct] = useState<TypeProduct[]>();
  const [selectedProduct, setSelectedProduct] = useState<TypeProduct>();
  const [product, setProduct] = useState<TypeProduct>();
  const [date, setDate] = useState<any>();

  // Изменить выбранный товар
  const onChangeProduct = (values: string, option: any): void => {
    const product: TypeProduct = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      product: product.id,
    });
    setSelectedProduct(product)
  };

  // Функция для получения данных о выпуске продукции по id и обновления формы
  const handleGetOutputById = useCallback(() => {
    if (selectedItemId) {
      getOutputById(selectedItemId).then((output) => {
        form.setFieldsValue({
          date: dayjs(output?.date),
          product: output?.product?.id,
        });
        setSelectedProduct(output?.product)
        setProduct(output?.product)
        setDate(dayjs(output?.date));
      })
    }
  }, [selectedItemId]);

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
    handleGetOutputById();
  }, [selectedItemId, handleGetOutputById]);

  return (
    <Drawer
      title="Редактирование выпуска продукции"
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
        initialValues={{date: date}}
      >
        <Form.Item
          label="Дата"
          name="date"
          rules={[{type: 'object' as const, required: true, message: 'выберите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            format='DD.MM.YYYY'
            onChange={(value) => setDate(value)}
          />
        </Form.Item>
        <Form.Item
          label="Товар"
          name="product"
          rules={[{required: true, message: 'Выберите товар'}]}
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
      </Form>
    </Drawer>
  )
}