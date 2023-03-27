import React, {useCallback, useEffect, useState} from "react";
import {Form, Drawer, Select, Space, Button, InputNumber} from "antd";
import {EditDrawerProps, ProductType, ProductBatchType} from "../../../types/_index";
import {getAllProducts, getProductBatchById} from "../../../services";

const {Option} = Select;

export const EditDrawerProductBatch: React.FC<EditDrawerProps<ProductBatchType>> = ({
                                                                            isOpen,
                                                                            selectedItemId,
                                                                            closeDrawer,
                                                                            updateItem,
                                                                          }) => {
  const [form] = Form.useForm();

  // Все товары
  const [products, setProducts] = useState<ProductType[]>();

  // Выбранный товар
  const [selectedProduct, setSelectedProduct] = useState<ProductType>();
  const [product, setProduct] = useState<ProductType>();

  // Функция для изменения выбранного товара
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

  // Функция для получения данных о партии товаров по id
  const handleGetProductBatchById = useCallback(() => {
    if (selectedItemId) {
      getProductBatchById(selectedItemId).then((productBatch) => {
        form.setFieldsValue({
          product: productBatch?.product?.id,
          amount: productBatch?.amount,
        });
        setSelectedProduct(productBatch?.product)
        setProduct(productBatch?.product)
      })
    }
  }, [selectedItemId]);

  useEffect(() => {
    getAllProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  useEffect(() => {
    handleGetProductBatchById();
  }, [selectedItemId, handleGetProductBatchById]);

  return (
    <Drawer
      title="Редактирование партии товаров"
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
          label="Количество"
          name="amount"
          rules={[{required: true, message: 'введите количество'}]}
        >
          <InputNumber style={{width: '100%'}}/>
        </Form.Item>
      </Form>
    </Drawer>
  )
}