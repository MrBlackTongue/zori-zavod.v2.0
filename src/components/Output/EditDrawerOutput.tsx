import {Button, DatePicker, Drawer, Form, Select, Space} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {EditOutputProps, ProductTypes} from "../../types";
import {getOutputById, getAllProducts} from "../../services";
import dayjs from 'dayjs';

const {Option} = Select;

export const EditDrawerOutput: React.FC<EditOutputProps> = ({
                                                        isOpen,
                                                        selectedOutputId,
                                                        closeDrawer,
                                                        updateOutput,
                                                      }) => {
  const [form] = Form.useForm();

  const [products, setProducts] = useState<ProductTypes[]>();
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes>();
  const [product, setProduct] = useState<ProductTypes>();
  const [date, setDate] = useState<any>();

  const onChangeProduct = (values: string, option: any): ProductTypes => {
    const product: ProductTypes = {
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
    if (selectedOutputId) {
      getOutputById(selectedOutputId).then((output) => {
        form.setFieldsValue({
          date: dayjs(output?.date),
          product: output?.product?.id,
        });
        setSelectedProduct(output?.product)
        setProduct(output?.product)
        setDate(dayjs(output?.date));
      })
    }
  }, [selectedOutputId]);

  useEffect(() => {
    getAllProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  useEffect(() => {
    handleGetOutputById();
  }, [selectedOutputId, handleGetOutputById]);

  return (
    <Drawer
      title="Редактирование выпуск продукции"
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
                updateOutput(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          }} type="primary" form='change-output' htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        id='change-output'
        form={form}
        name="change-output"
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