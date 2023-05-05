import React, {useEffect, useState} from "react";
import {AddModalProps, TypeProduct, TypeStock} from "../../../types";
import {Form, Modal, Select, InputNumber} from "antd";
import {getAllProduct} from "../../../services";

const {Option} = Select;

export const AddModalStock: React.FC<AddModalProps<TypeStock>> = ({
                                                                    isOpen,
                                                                    addItem,
                                                                    onCancel,
                                                                  }) => {
  const [form] = Form.useForm();

  // Все товары, выбранный товар
  const [allProduct, setAllProduct] = useState<TypeProduct[]>();
  const [selectedProduct, setSelectedProduct] = useState<TypeProduct>();

  // Изменить выбранный товар
  const onChangeProduct = (value: string | number | undefined, option: any): TypeProduct | undefined => {
    if (value === undefined) {
      form.setFieldsValue({
        product: undefined,
      });
      setSelectedProduct(undefined);
      return undefined;
    }
    const product: TypeProduct = {
      id: value as number, // приведение типа к числу
      title: option.title,
    };
    form.setFieldsValue({
      product: product.id
    });
    setSelectedProduct(product)
    return product;
  };

  // Функция для поиска остаков по названию
  const searchFilter = (input: string, option: any) => {
    return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  // Функция подтверждения добавления новой ячейки на склад
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedProduct(undefined)
        addItem(values);
      })
      .catch((error) => {
        console.log("Validate Failed:", error);
      });
  };

  // Функция закрытия модального окна
  const handleClose = () => {
    form.resetFields();
    setSelectedProduct(undefined);
    onCancel()
  };

  useEffect(() => {
    getAllProduct().then((products) => {
      setAllProduct(products);
    });
  }, []);

  return (
    <Modal
      title={`Добавление новой ячейки на склад`}
      open={isOpen}
      onCancel={handleClose}
      width={500}
      okText={"Сохранить"}
      cancelText={"Отмена"}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{
          modifier: "public",
        }}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Товар"
          name="product"
          rules={[{required: true, message: 'выберите товар'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
              value={selectedProduct ? selectedProduct.id : undefined}
              onChange={onChangeProduct}
              filterOption={searchFilter} 
            >
              {allProduct && allProduct.length > 0 ?
                allProduct.map(product => (
                  <Option id={product.id} key={product.id} value={product.id} title={product.title}>
                    {product.title}
                  </Option>
                )) : null}
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
    </Modal>
  );
};