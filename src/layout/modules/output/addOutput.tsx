import React, {useEffect, useState} from "react";
import {AddOutputProps} from "../../../types/outputType";
import {Form, Modal, DatePicker, Select} from "antd";
import type { DatePickerProps } from 'antd';
import {getAllProducts} from "../../../requests/productsRequests";
import {ProductType} from "../../../types/productType";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const {Option} = Select;
const dateFormat = 'YYYY/MM/DD';
const dateFormatUser = 'DD/MM/YYYY';
// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

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

  const onChangeDate = ( date: any, dateString: any) => {
    form.setFieldsValue({
      dateUser: dateString,
    });
      console.log('date: ', date);
      console.log('dateString: ', dateString);
  };

  // const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
  //   // form.setFieldsValue({
  //   //   date: dateString
  //   // });
  //   form.setFields([  {    name: 'date',    value: dateString  }]);
  //
  //   console.log('date', dateString);
  // };

  // const onChangeDate = (
  //   value: DatePickerProps['value'] ,
  //   dateString: [string, string] | string,
  // ) => {
  //   // form.setFields([  {    name: 'date',    value: dateString  }]);
  //   console.log('Selected Time: ', value);
  //   console.log('Formatted Selected Time: ', dateString);
  // };

  useEffect(() => {
    getAllProducts().then((products) => {
      setProducts(products);
    });
  }, []);
  
  return (
    <Modal
      title={`Добавление нового выпуска продукции`}
      open={isOpen}
      onCancel={onCancel}
      width={500}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            console.log('values1', values)
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
      </Form>
    </Modal>
  )
}