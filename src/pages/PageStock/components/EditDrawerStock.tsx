import React, {useState, useEffect, useCallback} from "react";
import {Form, Drawer, Select, InputNumber, Space, Button} from "antd";
import {EditDrawerProps, TypeProduct, TypeStock} from "../../../types";
import {getStockById, getAllProduct} from "../../../services";

const {Option} = Select;

export const EditDrawerStock: React.FC<EditDrawerProps<TypeStock>> = ({
                                                                        isOpen,
                                                                        selectedItemId,
                                                                        closeDrawer,
                                                                        updateItem,
                                                                      }) => {
  const [form] = Form.useForm();

  // Все остатки, все товары, выбранный товар
  const [allProduct, setAllProduct] = useState<TypeProduct[]>();
  const [selectedProduct, setSelectedProduct] = useState<TypeProduct>();
  const [filteredProduct, setFilteredProduct] = useState<TypeProduct[]>([]);

  // Изменить выбранный товар
  const onChangeProduct = (value: string): void => {
    const selectedProduct = allProduct?.find(product => product.id === parseInt(value));
    form.setFieldsValue({product: selectedProduct});
    setSelectedProduct(selectedProduct)
  }

  // Поиск по товару
  const onSearchProduct = (searchText: string): void => {
    if (searchText === '') {
      setFilteredProduct(allProduct || []);
    } else {
      const searchLowerCase = searchText.toLowerCase();
      const filtered = allProduct?.filter((product) => {
        return product && product.title
          ? product.title.toLowerCase().includes(searchLowerCase)
          : false;
      });
      setFilteredProduct(prevState => filtered || prevState);
    }
  };

  // Функция для получения данных об остатке по id и обновление формы
  const handleGetStock = useCallback((): void => {
    if (selectedItemId) {
      getStockById(selectedItemId).then((stock) => {
        form.setFieldsValue({
          product: stock?.product,
          amount: stock?.amount,
        });
        setSelectedProduct(stock?.product);
      });
    }
  }, [selectedItemId, form]);

  // Функция подтверждения редактирования
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
        closeDrawer();
        onSearchProduct('')
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };

  // Функция закрытия дравера
  const handleClose = (): void => {
    closeDrawer();
    form.resetFields();
  };

  useEffect(() => {
    if (isOpen) {
      handleGetStock();
    } else {
      form.resetFields();
    }
  }, [isOpen, handleGetStock, form]);

  useEffect(() => {
    getAllProduct().then((allProduct) => {
      setAllProduct(allProduct);
      setFilteredProduct(allProduct)
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
