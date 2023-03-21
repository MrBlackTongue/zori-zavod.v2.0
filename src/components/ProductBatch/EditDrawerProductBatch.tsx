import React, {useCallback, useEffect, useState} from "react";
import {Form, Drawer, Select, Space, Button, InputNumber} from "antd";
import {EditItemProps, ProductTypes, ProductBatchTypes} from "../../types";
import {getAllProducts, getProductBatchById} from "../../services";

const {Option} = Select;

export const EditDrawerProductBatch: React.FC<EditItemProps<ProductBatchTypes>> = ({
                                                                            isOpen,
                                                                            selectedItemId,
                                                                            closeDrawer,
                                                                            updateItem,
                                                                          }) => {
  const [form] = Form.useForm();

  // Выбранный продукт
  const [products, setProducts] = useState<ProductTypes[]>();
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes>();
  const [product, setProduct] = useState<ProductTypes>();
  
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
      title="Редактирование партии товара"
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
          }} type="primary" form='change-productBatch' htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        id='change-productBatch'
        form={form}
        name="change-productBatch"
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Товар"
          name="product"
          rules={[{required: true, message: "Выберите товар"}]}
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
          rules={[{required: true, message: 'Пожалуйста укажите количество'}]}
        >
          <InputNumber style={{width: '100%'}}/>
        </Form.Item>
      </Form>
    </Drawer>
  )
}