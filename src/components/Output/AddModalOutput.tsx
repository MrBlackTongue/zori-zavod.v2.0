import React, {useEffect, useState} from "react";
import {AddOutputProps, ProductTypes} from "../../types";
import {Form, Modal, DatePicker, Select} from "antd";
import {getAllProducts} from "../../services";

const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY';

export const AddModalOutput: React.FC<AddOutputProps> = ({
                                                          isOpen,
                                                          addOutput,
                                                          onCancel,
                                                        }) => {
  const [form] = Form.useForm();

  const [products, setProducts] = useState<ProductTypes[]>();
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes>();

  const onChangeProduct = (values: string, option: any): ProductTypes => {
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

  return (
    <Modal
      title={`Добавление нового выпуска продукции`}
      open={isOpen}
      onCancel={()=>{
        onCancel()
        setSelectedProduct(undefined)
      }}
      width={500}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            setSelectedProduct(undefined)
            addOutput(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        name="add-new-output"
        initialValues={{
          modifier: 'public'
        }}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Дата"
          name="date"
          rules={[{ type: 'object' as const, required: true, message: 'Пожалуйста введите дату' }]}
        >
          <DatePicker
            style={{width: '100%'}}
            format={dateFormatUser}
          />
        </Form.Item>
        <Form.Item
          label="Продукт"
          name="product"
          rules={[{required: true, message: 'Пожалуйста выберите продукт'}]}
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
      </Form>
    </Modal>
  )
}