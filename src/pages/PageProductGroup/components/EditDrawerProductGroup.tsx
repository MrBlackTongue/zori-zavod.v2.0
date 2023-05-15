import { Form, Input, Drawer, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { EditDrawerProps, TypeProductGroup } from "../../../types";
import { getAllProductGroup } from "../../../services";

export const EditDrawerProductGroup: React.FC<EditDrawerProps<TypeProductGroup>> = ({
                                                                                      isOpen,
                                                                                      selectedItemId,
                                                                                      updateItem,
                                                                                      closeDrawer,
                                                                                    }) => {
  const [form] = Form.useForm();
  const [productGroup, setProductGroup] = useState<TypeProductGroup[]>([]);

  useEffect(() => {
    getAllProductGroup().then(setProductGroup);
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        updateItem(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Drawer
      title={`Редактирование группы товаров`}
      open={isOpen}
      onClose={closeDrawer}
      width={650}
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
          rules={[{ required: true, message: 'Введите название группы' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Родительская группа"
          name="parent"
        >
          <Select placeholder="Выберите родительскую группу">
            {productGroup.map(group => (
              <Select.Option key={group.id} value={group.id}>{group.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleOk}>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
