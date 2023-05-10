import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Space, Select } from "antd";
import { EditDrawerProps, TypeProductGroup } from "../../../types";
import { getProductGroupById, getAllProductGroup} from "../../../services";

const { Option } = Select;

export const EditDrawerProductGroup: React.FC<EditDrawerProps<TypeProductGroup>> = ({
  isOpen,
  selectedItemId,
  closeDrawer,
  updateItem,
}) => {
  const [form] = Form.useForm();
  const [allProductGroups, setAllProductGroups] = useState<TypeProductGroup[]>([]);

  // Функция подтверждения редактирования
  const handleOk = () => {
    closeDrawer();
    form
      .validateFields()
      .then((values) => {
        updateItem({ ...values, parentGroup: values.parentGroup });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  useEffect(() => {
    if (selectedItemId) {
      getProductGroupById(selectedItemId).then((productGroup) => {
        form.setFieldsValue({ ...productGroup, parentGroup: productGroup?.parent?.id });
      });
    }
  }, [selectedItemId]);

  useEffect(() => {
    getAllProductGroup().then((productGroup) => {
      setAllProductGroups(productGroup);
    });
  }, []);

  return (
    <Drawer
      title="Редактирование товарной группы"
      width={670}
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
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} style={{ marginTop: 30 }}>
        <Form.Item label="Название" name="title" rules={[{ required: true, message: "введите название" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Родительская группа"
          name="parentGroup"
          rules={[{ required: true, message: "выберите родительскую группу" }]}
        >
          <Select placeholder="Выберите родительскую группу">
            {allProductGroups.map((group) => (
              <Option key={group.id} value={group.id}>
                {group.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
