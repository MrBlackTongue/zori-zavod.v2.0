import React, {useEffect, useState} from "react";
import {AddItemProps, PurchaseType, ProductTypes} from "../../types";
import {Form, Modal, Select, InputNumber, DatePicker, Checkbox} from "antd";
import {getAllProducts} from "../../services";
import {CheckboxChangeEvent} from "antd/es/checkbox";

const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY';

export const AddModalPurchase: React.FC<AddItemProps<PurchaseType>> = ({
                                                                           isOpen,
                                                                           addItem,
                                                                           onCancel,
                                                                       }) => {
    const [form] = Form.useForm();

    const [products, setProducts] = useState<ProductTypes[]>();
    const [selectedProduct, setSelectedProduct] = useState<ProductTypes>();

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        form.setFieldsValue({hired: e.target.checked});
    }

    const onChangeProduct = (values: string, option: any): ProductTypes => {
        const product: ProductTypes = {
            id: option.id,
            title: values,
        };
        form.setFieldsValue({
            product: product
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
            title={`Добавление новой закупки`}
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
                name="add-new-purchase"
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
                    rules={[{required: true, message: "Выберите товар"}]}
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
                    label="Цена"
                    name="cost"
                    rules={[{required: true, message: "Пожалуйста введите цену"}]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item
                    label="Количество"
                    name="amount"
                    rules={[{required: true, message: "Пожалуйста введите количество"}]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item
                    label="Дата"
                    name="product"
                    rules={[{type: 'object' as const, required: true, message: 'Пожалуйста введите дату'}]}
                >
                    <DatePicker
                        style={{width: '100%'}}
                        format={dateFormatUser}
                    />
                </Form.Item>
                <Form.Item
                    name="paid"
                    wrapperCol={{offset: 8, span: 16}}
                >
                    <Checkbox onChange={onChangeCheckbox}>Оплачено</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};