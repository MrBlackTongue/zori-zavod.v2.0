import React, { useState, useEffect } from "react";
import { AddModalProps, TypeProductGroup } from "../../../types";
import { Form, Input, Modal, Select } from "antd";
import { getAllProductGroup } from "../../../services";

const { Option } = Select;

export const AddModalProductGroup: React.FC<AddModalProps<TypeProductGroup>> = ({
                                                                                  isOpen,
                                                                                  addItem,
                                                                                  onCancel,
                                                                                }) => {
  const [form] = Form.useForm();
  const [parentGroups, setParentGroups] = useState<TypeProductGroup[]>([]);

  useEffect(() => {
    getAllProductGroup().then((allProductGroups) => setParentGroups(allProductGroups));
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addItem(values);
      })
      .catch((info) => {
        console.log("Validate failed:", info);
      });
  };

  return (
    <Modal
      title={`Добавить новую группу товаров`}
      open={isOpen}
      onCancel={onCancel}
      width={650}
      okText={"Сохранить"}
      cancelText={"Отмена"}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{ modifier: "public" }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: 30 }}
      >
        <Form.Item
          label="Название"
          name="title"
          rules={[{ required: true, message: "введите название" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Родительская группа" name="parentId">
          <Select placeholder="Выберите родительскую группу" allowClear>
            {parentGroups.map((group) => (
              <Option key={group.id} value={group.id}>
                {group.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};