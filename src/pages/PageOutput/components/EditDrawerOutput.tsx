import {Button, DatePicker, Drawer, Form, Select, Space} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {EditDrawerProps, OutputType, ProductType} from "../../../types/_index";
import {getOutputById, getAllProducts} from "../../../services";
import dayjs from 'dayjs';

const {Option} = Select;

export const EditDrawerOutput: React.FC<EditDrawerProps<OutputType>> = ({
                                                        isOpen,
                                                        selectedItemId,
                                                        closeDrawer,
                                                        updateItem,
                                                      }) => {
  const [form] = Form.useForm();

  const [products, setProducts] = useState<ProductType[]>();

  const [selectedProduct, setSelectedProduct] = useState<ProductType>();
  const [product, setProduct] = useState<ProductType>();

  const [date, setDate] = useState<any>();

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

  useEffect(() => {
    getAllProducts().then((products) => {
      setProducts(products);
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
            onChange={(value) => {
              setDate(value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Продукт"
          name="product"
          rules={[{ required: true, message: 'Выберите продукт' }]}
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
      </Form>
    </Drawer>
  )
}