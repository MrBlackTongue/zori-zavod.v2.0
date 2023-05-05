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

  // Все остатки, все товары, выбранный товар
  const [allStock, setAllStock] = useState<TypeStock[]>();
  const [allProduct, setAllProduct] = useState<TypeProduct[]>();
  const [product, setProduct] = useState<TypeProduct>();

  // Изменить выбранный остаток на складе
  const onChangeProduct = (value: number | undefined): TypeProduct | undefined => {
    if (value === undefined) {
      form.setFieldsValue({
        product: undefined,
      });
      setProduct(undefined);
      return undefined;
    }

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


  // Функция для получения данных об остатке по id и обновление формы
  const handleGetStockById = useCallback(() => {
    if (selectedItemId) {
      getStockById(selectedItemId).then((stock) => {
        form.setFieldsValue({
          product: stock?.product?.id,
          amount: stock?.amount,
        });
        setProduct(stock?.product);
      });
    }
  }, [selectedItemId, form]);

  // Функция подтверждения редактирования
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
        closeDrawer();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Функция фильтрации продукта по остатку
  const filterProducts = (input: string, option: any): boolean => {
    return option?.label
      ? typeof option.label === "string" &&
      option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
      : false;
  };

  // Функция закрытия дравера
  const handleClose = () => {
    closeDrawer();
    form.resetFields(['product']);
  };

  useEffect(() => {
    getAllStock().then((stock) => {
      setAllStock(stock);
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      handleGetStockById();
    } else {
      form.resetFields(['product']);
    }
  }, [isOpen, handleGetStockById, form]);

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
              showSearch
              allowClear
              value={product ? product.id : undefined}
              onChange={onChangeProduct}
              filterOption={filterProducts}
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
    </Drawer>
  );
};
