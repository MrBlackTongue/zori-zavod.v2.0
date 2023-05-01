import React, {useCallback, useEffect, useState} from "react";
import {Form, Drawer, Select, InputNumber, Space, Button} from "antd";
import {EditDrawerProps, TypeProduct, TypeStock} from "../../../types";
import {getAllStock, getStockById} from "../../../services";

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

  // Добавьте состояние loading
  const [loading, setLoading] = useState<boolean>(true);

  // Остальной код компонента

  const onChangeProduct = (values: string, option: any): TypeProduct => {
    const product: TypeProduct = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      product: product.id,
    });
    setProduct(product);
    return product;
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
    form.resetFields();
    closeDrawer();
  };

  useEffect(() => {
    getAllStock().then((stock) => {
      setAllStock(stock);
    });
  }, []);

  useEffect(() => {
    handleGetStockById();
  }, [selectedItemId, handleGetStockById]);

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
              closeDrawer();
              form
                .validateFields()
                .then((values) => {
                  updateItem(values);
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
                value={product ? product.title : undefined}
                onChange={onChangeProduct}
              >
                {allStock && allStock.length > 0
                  ? allStock.map((stock) => (

                    <Option
                      key={stock?.product?.id}
                      value={stock?.product?.title}
                    >
                      {stock?.product?.title}
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
            <InputNumber style={{width: "100%"}}/>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
};