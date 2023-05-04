import React, {useCallback, useEffect, useState} from "react";
import {Form, Drawer, Select, InputNumber, Space, Button} from "antd";
import {EditDrawerProps, TypeProduct, TypeStock} from "../../../types";
import {getAllStock, getStockById, getAllProduct} from "../../../services";

const {Option} = Select;

export const EditDrawerStock: React.FC<EditDrawerProps<TypeStock>> = ({
                                                                        isOpen,
                                                                        selectedItemId,
                                                                        closeDrawer,
                                                                        updateItem,
                                                                      }) => {
  const [form] = Form.useForm();

  // Все товары, выбранный товар
  const [allStock, setAllStock] = useState<TypeStock[]>();
  const [selectedStock, setSelectedStock] = useState<TypeStock>();
  const [product, setProduct] = useState<TypeProduct>();
  const [allProduct, setAllProduct] = useState<TypeProduct[]>();

  // состояние loading
  const [loading, setLoading] = useState<boolean>(true);

  const onChangeProduct = (value: number): TypeProduct | undefined => {
    const selectedProduct = allStock?.find((stock) => stock?.product?.id === value);
    if (selectedProduct) {
      form.setFieldsValue({
        product: selectedProduct?.product?.id,
      });
      setProduct(selectedProduct.product);
      return selectedProduct.product;
    }
    return undefined;
  };

  const handleGetStockById = useCallback(() => {
    if (selectedItemId) {
      setLoading(true);
      getStockById(selectedItemId).then((stock) => {
        form.setFieldsValue({
          product: stock?.product?.id,
          amount: stock?.amount,
        });
        setSelectedStock(stock);
        setProduct(stock?.product);
        setLoading(false);
      });
    }
  }, [selectedItemId, form]);

  const handleClose = () => {
    closeDrawer();
  };

  useEffect(() => {
    getAllStock().then((stock) => {
      setAllStock(stock);
    });
  }, []);

  useEffect(() => {
    handleGetStockById();
    form.resetFields();
  }, [selectedItemId, handleGetStockById, form]);


  useEffect(() => {
    getAllProduct().then((product) => {
      setAllProduct(product);
    });
  }, []);

  return (
    <Drawer
      title="Редактирование ячейки на складе"
      width={600}
      open={isOpen}
      onClose={handleClose}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={handleClose}>Отмена</Button>
          <Button
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  updateItem(values);
                  closeDrawer();
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
            type="primary"
            htmlType="submit"
          >
            Сохранить
          </Button>
        </Space>
      }
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
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
                showSearch
                allowClear
                value={product ? product.id : undefined}
                onChange={onChangeProduct}
                filterOption={(input, option) =>
                  option?.label
                    ? typeof option.label === "string" &&
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    : false
                }
              >
                {allProduct && allProduct.length > 0
                  ? allProduct.map((product) => (
                    <Option key={product.id} value={product.id} label={product.title}>
                      {product.title}
                    </Option>
                  ))
                  : null}
              </Select>
            </div>
          </Form.Item>
          <Form.Item
            label="Количество"
            name="amount"
            rules={[{required: true, message: "введите количество"}]}
          >
            <InputNumber style={{width: "100%"}} min={0} />
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
};