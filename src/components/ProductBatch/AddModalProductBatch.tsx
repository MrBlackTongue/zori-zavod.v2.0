import React, {useEffect, useState} from "react";
import {AddItemProps, ProductTypes, ProductBatchTypes} from "../../types";
import {Form, Modal, Select} from "antd";
import {getAllProducts} from "../../services";

const {Option} = Select;

export const AddModalProductBatch: React.FC<AddItemProps<ProductBatchTypes>> = ({
                                                                                  isOpen,
                                                                                  addItem,
                                                                                  onCancel,
                                                                                }) => {
  const [form] = Form.useForm();

  const [products, setProducts] = useState<ProductTypes[]>();
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes>();

  const onChangeProductBatch = (values: string, option: any): ProductBatchTypes => {
    const product: ProductTypes = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      product: product.id
    });
    setSelectedProduct(product)
    return product
  };

  useEffect(() => {
    getAllProducts().then((products) => {
      setProducts(products);
    });
  }, []);

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

  return (
    <Modal
      title={`Добавление новой партии товара`}
      open={isOpen}
      onCancel={() => {
        onCancel()
        setSelectedProduct(undefined)
      }}
      width={500}
      okText={"Сохранить"}
      cancelText={"Отмена"}
      onOk={handleOk}
    >
      <Form
        form={form}
        name="add-new-product-batch"
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
          rules={[{required: true, message: 'Пожалуйста выберите товар'}]}
        >
          <div>
            <Select
              value={selectedProduct ? selectedProduct.title : undefined}
              onChange={onChangeProductBatch}
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
      </Form>
    </Modal>
  );
};