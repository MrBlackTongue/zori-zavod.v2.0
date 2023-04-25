import React, { useCallback, useEffect, useState } from "react";
import { Form, Drawer, Select, InputNumber, Space, Button } from "antd";
import { EditDrawerProps, TypeProduct, TypeStock } from "../../../types";
import { getAllStock, getStockById } from "../../../services";

const { Option } = Select;

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

  // Изменить выбранный товар со склада
  const onChangeStock = (values: string, option: any): TypeStock => {
    const product: TypeProduct = {
      id: option.key, // Изменено с option.id на option.key, так как мы используем key в Option
      title: values,
    };
    form.setFieldsValue({
      product: product.id,
    });
    setSelectedStock(product);
    return product;
  };

  // Функция для получения данных об остатках по id и обновления формы
  const handleGetStockById = useCallback(() => {
    if (selectedItemId) {
      getStockById(selectedItemId).then((stock) => {
        form.setFieldsValue({
          product: stock?.product?.id, // Используем id продукта, а не сам продукт
          amount: stock?.amount, // Изменено с product?.amount на stock?.amount
        });
        setSelectedStock(stock);
      });
    }
  }, [selectedItemId, form]);

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
      visible={isOpen} // Используйте "visible" вместо "open"
      onClose={() => {
        closeDrawer();
      }}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button
            onClick={() => {
              closeDrawer();
            }}
          >
            Отмена
          </Button>
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
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: 30 }}
      >
        <Form.Item
          label="Товар"
          name="product"
          rules={[{ required: true, message: "выберите товар" }]}
        >
          <div>
            <Select
              showSearch
              allowClear
              value={selectedStock ? selectedStock.product?.title : undefined}
              onChange={onChangeStock}
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
          rules={[{ required: true, message: "введите количество" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
