import React, {useEffect, useState} from "react";
import {AddModalProps, TypeProduct, TypeStock} from "../../../types";
import {Form, Modal, Select, InputNumber} from "antd";
import {getAllStock} from "../../../services";

const {Option} = Select;

export const AddModalStock: React.FC<AddModalProps<TypeStock>> = ({
                                                                          isOpen,
                                                                          addItem,
                                                                          onCancel,
                                                                        }) => {
  const [form] = Form.useForm();

  // Все товары, выбранный товар
  const [allStock, setAllStock] = useState<TypeStock[]>();
  const [selectedStock, setSelectedStock] = useState<TypeStock>();

  // Изменить выбранный товар
  const onChangeStock = (values: string, option: any): TypeProduct => {
    const product: TypeProduct = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      product: product.id
    });
    setSelectedStock(product)
    return product
  };

  // Функция подтверждения добавления новой закупки
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedStock(undefined)
        addItem(values);
      })
      .catch((error) => {
        console.log("Validate Failed:", error);
      });
  };

  useEffect(() => {
    getAllStock().then((stock) => {
      setAllStock(stock);
    });
  }, []);

  return (
    <Modal
      title={`Добавление новой ячейки на склад`}
      open={isOpen}
      onCancel={() => {
        onCancel()
        setSelectedStock(undefined)
      }}
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
              value={selectedStock ? selectedStock?.product?.title : undefined}
              onChange={onChangeStock}
            >
              {allStock && allStock.length > 0 ?
                allStock.map(stock => (
                  <Option id={stock?.product?.id} key={stock?.product?.id} value={stock?.product?.title}>
                    {stock?.product?.title}
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
          <InputNumber style={{width: "100%"}}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};