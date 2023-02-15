import {Button, DatePicker, Drawer, Form, Select, Space} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {EditOutputProps, OutputType} from "../../../types/outputType";
import {getOutputById} from "../../../requests/outputsRequests";
import {ProductType} from "../../../types/productType";
import {getAllProducts} from "../../../requests/productsRequests";
import dayjs from 'dayjs';

const {Option} = Select;

export const EditOutput: React.FC<EditOutputProps> = ({
                                                        isOpen,
                                                        selectedOutputId,
                                                        closeDrawer,
                                                        updateOutput,
                                                      }) => {
  const [form] = Form.useForm();

  const [products, setProducts] = useState<ProductType[]>();
  const [selectedProduct, setSelectedProduct] = useState<ProductType>();
  const [product, setProduct] = useState<ProductType>();
  const [date, setDate] = useState<any>();
  const [outputId, setOutputId] = useState<OutputType>()

  const onChangeProduct = (values: string, option: any): ProductType => {
    const product: ProductType = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      product: product.id,
    });
    console.log('product', product)
    setSelectedProduct(product)
    return product
  };

  const handleGetOutputById = useCallback(() => {
    if (selectedOutputId) {
      getOutputById(selectedOutputId).then((output) => {
        // form.setFieldsValue(output);
        form.setFieldsValue({
          id: output?.id,
          date: dayjs(output?.date),
          product: output?.product?.id,
        });
        setSelectedProduct(output?.product)
        setProduct(output?.product)
        setDate(dayjs(output?.date));
        // setDate(output?.date)
        // console.log('dayjs', dayjs(output?.date))
        console.log('output', output)
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
                console.log('values :', values)
                form.resetFields()
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
          rules={[{type: 'object' as const, required: true, message: 'Пожалуйста введите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            // value={date}
            format='DD.MM.YYYY'
            // defaultValue={date}
            onChange={(value) => {
              setDate(value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Продукт"
          name="product"
          rules={[{required: true, message: 'Пожалуйста выберите продукт'}]}
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
          name='id'
        >
        </Form.Item>
      </Form>
    </Drawer>
  )
}