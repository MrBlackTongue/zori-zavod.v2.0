import React, {useEffect, useState} from "react";
import {AddOutputProps} from "../../../types/outputType";
import {Form, Modal, DatePicker, Select} from "antd";
import {getAllProducts} from "../../../requests/productsRequests";
import {ProductType} from "../../../types/productType";

const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY';

export const AddOutput: React.FC<AddOutputProps> = ({
                                                          isOpen,
                                                          addOutput,
                                                          onCancel,
                                                        }) => {
  const [form] = Form.useForm();

  const [products, setProducts] = useState<ProductType[]>();
  const [selectedProduct, setSelectedProduct] = useState<ProductType>();

  const onChangeProduct = (values: string, option: any): ProductType => {
    const product: ProductType = {
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