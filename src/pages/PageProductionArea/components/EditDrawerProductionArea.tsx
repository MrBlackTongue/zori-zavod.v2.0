import {Button, Drawer, Form, Input, Space} from "antd";
import React, {useEffect} from "react";
import {EditDrawerProps, TypeProductionArea} from "../../../types";
import {getProductionAreaById} from "../../../services";

export const EditDrawerProductionArea: React.FC<EditDrawerProps<TypeProductionArea>> = ({
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
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  // Функция закрытия дравера
  const handleClose = () => {
    form.resetFields();
    if (selectedItemId) {
      getProductionArea(selectedItemId).catch((error) => console.error(error));
    }
    closeDrawer();
  };

  // Функция для получения информации выбранной записи и установления значений полей формы
  const getProductionArea = async (itemId: number) => {
    const productionArea = await getProductionAreaById(itemId);
    form.setFieldsValue(productionArea);
  }

  useEffect(() => {
    if (selectedItemId) {
      getProductionArea(selectedItemId).catch((error) => console.error(error));
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