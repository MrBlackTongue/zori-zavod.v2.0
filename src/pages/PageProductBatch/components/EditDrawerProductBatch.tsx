import React, {useCallback, useEffect, useState} from "react";
import {Form, Drawer, Select, Space, Button, InputNumber} from "antd";
import {EditDrawerProps, TypeProduct, TypeProductBatch} from "../../../types";
import {getAllProduct, getProductBatchById} from "../../../services";

const {Option} = Select;

export const EditDrawerProductBatch: React.FC<EditDrawerProps<TypeProductBatch>> = ({
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

  // Изменить выбранный товар
  const onChangeProduct = (values: string, option: any): TypeProduct => {
    const product: TypeProduct = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      product: product.id,
    });
    setSelectedProduct(product)
    return product
  };

  // Функция для получения данных о партии товаров по id и обновления формы
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

  // Функция подтверждения редактирования
  const handleOk = () => {
    closeDrawer()
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  // Функция закрытия дравера
  const handleClose = () => {
    closeDrawer()
    setSelectedProduct(product)
  };

  useEffect(() => {
    getAllProduct().then((products) => {
      setAllProduct(products);
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