import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Space } from "antd";
import { EditDrawerProps, TypeProductGroup } from "../../../types";
import { getProductGroupById } from "../../../services";

export const EditDrawerProductGroup: React.FC<EditDrawerProps<TypeProductGroup>> = ({
                                                                                      isOpen,
                                                                                      selectedItemId,
                                                                                      closeDrawer,
                                                                                      updateItem,
                                                                                    }) => {
  const [form] = Form.useForm();

  // Функция подтверждения редактирования
  const handleOk = () => {
    closeDrawer();
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  useEffect(() => {
    if (selectedItemId) {
      getProductGroupById(selectedItemId).then((productGroup) => {
        form.setFieldsValue(productGroup);
      });
    }
  }, [selectedItemId]);

  return (
    <Drawer
      title="Редактирование группы товаров"
      width={600}
      open={isOpen}
      onClose={closeDrawer}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeDrawer}>Отмена</Button>
          <Button onClick={handleOk} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: 30 }}
      >
        <Form.Item
          label="Название"
          name="title"
          rules={[{ required: true, message: 'введите название группы' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};