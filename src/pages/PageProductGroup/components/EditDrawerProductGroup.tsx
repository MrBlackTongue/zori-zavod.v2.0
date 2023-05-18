import React, { useEffect, useState } from "react";
import { Form, Input, Drawer, Select, Button } from "antd";
import {EditDrawerProps, TypeProductGroup} from "../../../types";
import {getProductGroupById, getAllProductGroup } from "../../../services";

export const EditDrawerProductGroup: React.FC<EditDrawerProps<TypeProductGroup>> = ({
                                                                                      isOpen,
                                                                                      selectedItemId,
                                                                                      updateItem,
                                                                                      closeDrawer,
                                                                                    }) => {
  const [form] = Form.useForm();
  const [productGroup, setProductGroup] = useState<TypeProductGroup[]>([]);
  const [selectedParentProductGroup, setSelectedParentProductGroup] = useState<TypeProductGroup>();

  useEffect(() => {
    getAllProductGroup().then(setProductGroup);
  }, []);

  useEffect(() => {
    if (selectedItemId !== undefined) {
      getProductGroupById(selectedItemId).then((data) => {
        console.log("data", data)
        console.log("parent", data?.parent)
        form.setFieldsValue({
          id: data?.id,
          title: data?.title,
          parent: data?.parent
        });
        setSelectedParentProductGroup(data?.parent)
      });
    }
  }, [selectedItemId, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();

      // Здесь мы получаем объект parent с полными данными.
      const parentGroup = productGroup.find(group => group.id === values.parent);

      updateItem({
        ...values,
        parent: parentGroup ? parentGroup : null,
      });
    } catch (info) {
      console.log('Validate Failed:', info);
    }
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
          name="id"
          style={{ display: 'none' }}
        >
          <Input type="hidden" />
        </Form.Item>
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
          <div>
            <Select
              placeholder="Выберите родительскую группу"
              value={selectedParentProductGroup ? selectedParentProductGroup.title : undefined}
            >
              {productGroup.map(group => (
                <Select.Option key={group.id} value={group.id}>{group.title}</Select.Option>
              ))}
            </Select>
          </div>
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