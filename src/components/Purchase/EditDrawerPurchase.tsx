import React, {useCallback, useEffect, useState} from "react";
import {Form, Drawer, Select, InputNumber, DatePicker, Checkbox, Space, Button} from "antd";
import {EditItemProps, ProductTypes, PurchaseType} from "../../types";
import {getAllProducts, getPurchaseById} from "../../services";
import dayjs from 'dayjs';
import {CheckboxChangeEvent} from "antd/es/checkbox";

const {Option} = Select;

export const EditDrawerPurchase: React.FC<EditItemProps<PurchaseType>> = ({
                                                                isOpen,
                                                                selectedItemId,
                                                                closeDrawer,
                                                                updateItem,
                                                            }) => {
    const [form] = Form.useForm();

    const [products, setProducts] = useState<ProductTypes[]>();
    const [selectedProduct, setSelectedProduct] = useState<ProductTypes>();
    const [product, setProduct] = useState<ProductTypes>();
    const [date, setDate] = useState<any>();

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        form.setFieldsValue({hired: e.target.checked});
    }

    const onChangeProduct = (values: string, option: any): ProductTypes => {
        const product: ProductTypes = {
            id: option.id,
            title: values,
        };
        form.setFieldsValue({
            product: product.id,
        });
        setSelectedProduct(product)
        return product
    };

    const handleGetPurchaseById = useCallback(() => {
        if (selectedItemId) {
            getPurchaseById(selectedItemId).then((purchase) => {
                form.setFieldsValue({
                    date: purchase?.date,
                    product: purchase?.product?.id,
                });
                setSelectedProduct(purchase?.product)
                setProduct(purchase?.product)
                setDate((purchase?.date));
            })
        }
    }, [selectedItemId]);

    useEffect(() => {
        getAllProducts().then((products) => {
            setProducts(products);
        });
    }, []);

    useEffect(() => {
        handleGetPurchaseById();
    }, [selectedItemId, handleGetPurchaseById]);

    return (
        <Drawer
            title="Редактирование закупки"
            width={600}
            open={isOpen}
            onClose={() => {
                closeDrawer()
                setSelectedProduct(product)
            }}
            bodyStyle={{paddingBottom: 80}}
            extra={
                <Space>
                    <Button onClick={() => {
                        closeDrawer()
                        setSelectedProduct(product)
                    }}>Отмена</Button>
                    <Button onClick={() => {
                        closeDrawer()
                        form
                            .validateFields()
                            .then((values) => {
                                updateItem(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info)
                            })
                    }} type="primary" form='change-purchase' htmlType="submit">
                        Сохранить
                    </Button>
                </Space>
            }
        >
            <Form
                id='change-purchase'
                form={form}
                name="change-purchase"
                labelCol={{span: 6}}
                wrapperCol={{span: 16}}
                style={{marginTop: 30}}
                initialValues={{date: date}}
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
                    <InputNumber style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item
                    label="Количество"
                    name="amount"
                    rules={[{required: true, message: "Пожалуйста введите количество"}]}
                >
                    <InputNumber style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item
                    label="Дата"
                    name="date"
                    rules={[{type: 'object' as const, required: true, message: 'Пожалуйста введите дату'}]}
                >
                    <DatePicker
                        style={{width: '100%'}}
                        format='DD.MM.YYYY'
                        onChange={(value) => {
                            setDate(value);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="paid"
                    wrapperCol={{offset: 8, span: 16}}
                >
                    <Checkbox onChange={onChangeCheckbox}>Оплачено</Checkbox>
                </Form.Item>
            </Form>
        </Drawer>
    )
}