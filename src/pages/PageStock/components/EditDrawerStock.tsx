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
  const [selectedProduct, setSelectedProduct] = useState<TypeProduct>();
  const [filteredProduct, setFilteredProduct] = useState<TypeProduct[]>([]);

  // Изменить выбранный товар
  const onChangeProduct = (value: string): TypeProduct | undefined => {
    const selectedProduct = allProduct?.find(product => product.id === parseInt(value));
    form.setFieldsValue({product: selectedProduct});
    setSelectedProduct(selectedProduct);
    return selectedProduct;
  }

  // Поиск по товару
  const onSearchProduct = (searchText: string) => {
    if (searchText === '') {
      setFilteredProduct(allProduct || []);
    } else {
      const searchLowerCase = searchText.toLowerCase();
      const filtered = allProduct?.filter((product) => {
        const titleMatch = product && product.title
          ? product.title.toLowerCase().includes(searchLowerCase)
          : false;

        return titleMatch;
      });
      setFilteredProduct(prevState => filtered || prevState);
    }
  };

  // Функция для получения данных об остатке по id и обновление формы
  const handleGetStockById = useCallback(() => {
    if (selectedItemId) {
      getStockById(selectedItemId).then((stock) => {
        form.setFieldsValue({
          product: stock?.product?.id,
          amount: stock?.amount,
        });
        setSelectedProduct(stock?.product);
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
        onSearchProduct('')
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
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
      setFilteredProduct(product)
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
              filterOption={false}
              value={selectedProduct ? selectedProduct.title : undefined}
              onChange={onChangeProduct}
              onSearch={onSearchProduct}
            >
              {filteredProduct && filteredProduct.length > 0
                ? filteredProduct.map((product) => (
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
          <InputNumber style={{width: "100%"}} min={0}/>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
