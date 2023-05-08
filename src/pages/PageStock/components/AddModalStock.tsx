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

  // Все товары, выбранный товар, отфильтрованные товары
  const [allProduct, setAllProduct] = useState<TypeProduct[]>();
  const [selectedProduct, setSelectedProduct] = useState<TypeProduct>();
  const [filteredProduct, setFilteredProduct] = useState<TypeProduct[]>([]);

  // Изменить выбранный товар
  const onChangeProduct = (value: string): TypeProduct | undefined => {
    const selectedProduct = allProduct?.find(product => product.id === parseInt(value));
    form.setFieldsValue({
      product: selectedProduct
    });
    setSelectedProduct(selectedProduct);
    return selectedProduct;
  };

  // Поиск по товарам
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

  // Функция подтверждения добавления новой ячейки на склад
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedProduct(undefined)
        addItem({...values, product: values.product});
        onSearchProduct('')
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
    getAllProduct().then((allProduct) => {
      setAllProduct(allProduct);
      setFilteredProduct(allProduct);
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
              filterOption={false}
              value={selectedProduct ? selectedProduct.title : undefined}
              onChange={onChangeProduct}
              onSearch={onSearchProduct}
            >
              {filteredProduct && filteredProduct.length > 0 ?
                filteredProduct.map(product => (
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