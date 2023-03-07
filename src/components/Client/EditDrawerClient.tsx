import {Button, Drawer, Form, Input, Space} from "antd";
import React, {useEffect} from "react";
import {EditClientProps} from "../../types";
import {getClientById} from "../../services";

export const EditDrawerClient: React.FC<EditClientProps> = ({
                                                                isOpen,
                                                                selectedClientId,
                                                                closeDrawer,
                                                                updateClient,
                                                            }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedClientId) {
            getClientById(selectedClientId).then((client) => {
                form.setFieldsValue(client);
            })
        }
    }, [selectedClientId, getClientById]);
    return (
        <Drawer
            title="Редактирование клиента"
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
                                updateClient(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info)
                            })
                    }} type="primary" form='change-client' htmlType="submit">
                        Сохранить
                    </Button>
                </Space>
            }
        >
            <Form
                id='change-client'
                form={form}
                name="change-client"
                labelCol={{span: 6}}
                wrapperCol={{span: 16}}
                style={{marginTop: 30}}
            >
                <Form.Item
                    label="Имя"
                    name="title"
                    rules={[{required: true, message: 'Пожалуйста введите имя'}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Drawer>
    )
}