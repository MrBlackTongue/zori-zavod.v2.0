import {Button, DatePicker, Drawer, Form, Input, Select, Space} from "antd";
import React, {useEffect, useState} from "react";
import {EditOutputProps} from "../../../types/outputType";
import {getOutputById} from "../../../requests/outputsRequests";
import {ProductType} from "../../../types/productType";

const {Option} = Select;
const dateFormatUser = 'DD/MM/YYYY';

export const EditOutput: React.FC<EditOutputProps> = ({
                                                            isOpen,
                                                            selectedOutputId,
                                                            closeDrawer,
                                                            updateOutput,
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

  const onChangeDate = ( date: any, dateString: any) => {
    form.setFieldsValue({
      dateUser: dateString,
    });
    console.log('date: ', date);
    console.log('dateString: ', dateString);
  };

  useEffect(() => {
    if (selectedOutputId) {
      getOutputById(selectedOutputId).then((output) => {
        form.setFieldsValue(output);
      })
    }
  }, [selectedOutputId, getOutputById]);

  return (
    <Drawer
      title="Редактирование выпуск продукции"
      width={600}
      open={isOpen}
      onClose={closeDrawer}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={closeDrawer}>Отмена</Button>
          <Button onClick={() => {
            closeDrawer()
            form
              .validateFields()
              .then((values) => {
                // form.resetFields()
                updateOutput(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          }} type="primary" form='change-output' htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        id='change-output'
        form={form}
        name="change-output"
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Дата"
          name="dateUser"
          rules={[{required: true, message: 'Пожалуйста введите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            onChange={onChangeDate}
            format={dateFormatUser}
            // format={dateFormatList}
            // defaultValue={dayjs('01/01/2015', dateFormatList[0])}
          />
        </Form.Item>
        <Form.Item
          label="Продукт"
          name="product"
          // rules={[{required: true, message: 'Пожалуйста выберите продукт'}]}
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
        <Form.Item
          name='id'>
        </Form.Item>
      </Form>
    </Drawer>
  )
}