import React from "react";
import {AddItemProps, PurchaseTypes} from "../../types";
import {Form, Input, Modal} from "antd";

export const AddModalPurchase: React.FC<AddItemProps<PurchaseTypes>> = ({
                                                                            isOpen,
                                                                            addItem,
                                                                            onCancel,
                                                                        }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
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
            onCancel={onCancel}
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
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ marginTop: 30 }}
            >
                <Form.Item
                    label="Количество"
                    name="amount"
                    rules={[{ required: true, message: "Пожалуйста введите количество" }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Стоимость"
                    name="cost"
                    rules={[{ required: true, message: "Пожалуйста введите стоимость" }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Дата"
                    name="date"
                    rules={[{ required: true, message: "Пожалуйста введите дату" }]}
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item
                    label="Товар"
                    name="product"
                    rules={[{ required: true, message: "Пожалуйста введите товар" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Оплачено"
                    name="paid"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Input type="checkbox" />
                </Form.Item>
            </Form>
        </Modal>
    );
};