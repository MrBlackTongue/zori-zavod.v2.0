import React, {useState, useEffect} from "react";
import {AddModalProps, TypeOutput, TypeProduct} from "../../../types";
import {Form, Modal, DatePicker, Select} from "antd";
import {getAllProduct} from "../../../services";

const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY';

export const AddModalOutput: React.FC<AddModalProps<TypeOutput>> = ({
                                                                      isOpen,
                                                                      addItem,
                                                                      onCancel,
                                                                    }) => {
  const [form] = Form.useForm();

  // Все товары, выбранный товар
  const [allProduct, setAllProduct] = useState<TypeProduct[]>();
  const [selectedProduct, setSelectedProduct] = useState<TypeProduct>();

  // Изменить выбранный товар
  const onChangeProduct = (value: string, option: any): void => {
    const product: TypeProduct = {
      id: option.id,
      title: value,
    };
    form.setFieldsValue({product: product});
    setSelectedProduct(product)
  };

  // Функция подтверждения добавления
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedProduct(undefined)
        addItem(values);
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  }

  // Функция закрытия модального окна
  const handleClose = (): void => {
    onCancel()
    setSelectedProduct(undefined)
  };

  useEffect(() => {
    getAllProduct().then((allProduct) => {
      setAllProduct(allProduct);
    });
  }, []);

  return (
    <Modal
      title={`Добавление нового выпуска продукции`}
      open={isOpen}
      onCancel={handleClose}
      width={500}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{modifier: 'public'}}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Дата"
          name="date"
          rules={[{type: 'object' as const, required: true, message: 'выберите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            format={dateFormatUser}
          />
        </Form.Item>
        <Form.Item
          label="Товар"
          name="product"
          rules={[{required: true, message: 'выберите товар'}]}
        >
          <div>
            <Select
              value={selectedProduct ? selectedProduct.title : undefined}
              onChange={onChangeProduct}
            >
              {allProduct && allProduct.length > 0 ?
                allProduct.map(product => (
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