import React, {useEffect} from "react";
import {Button, Drawer, Form, Input, Space} from "antd";
import {EditDrawerProps, TypeProductionType} from "../../../types";
import {getProductionTypeById} from "../../../services";

export const EditDrawerProductionType: React.FC<EditDrawerProps<TypeProductionType>> = ({
                                                                                          isOpen,
                                                                                          selectedItemId,
                                                                                          closeDrawer,
                                                                                          updateItem,
                                                                                        }) => {
  const [form] = Form.useForm();

  // Функция подтверждения редактирования
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
        closeDrawer()
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      })
  }

  // Функция закрытия дравера
  const handleClose = () => {
    form.resetFields();
    if (selectedItemId) {
      getProductionType(selectedItemId).catch((error) => console.error(error));
    }
    closeDrawer();
  };

  // Функция для получения информации выбранной записи и установления значений полей формы
  const getProductionType = async (itemId: number) => {
    const productionType = await getProductionTypeById(itemId);
    form.setFieldsValue(productionType);
  }

  useEffect(() => {
    if (selectedItemId) {
      getProductionType(selectedItemId).catch((error) => console.error(error));
    }
  }, [selectedItemId]);

  return (
    <Drawer
      title="Редактирование типа производства"
      width={600}
      open={isOpen}
      onClose={handleClose}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleOk} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Название"
          name="title"
          rules={[{required: true, message: 'введите название'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Описание"
          name="description"
          rules={[{required: true, message: 'введите описание'}]}
        >
          <Input.TextArea/>
        </Form.Item>
      </Form>
    </Drawer>
  )
}