import React, {useState, useEffect} from "react";
import {Form, Input, Modal, Select} from "antd";
import {AddModalProps, TypeProductGroup} from "../../../types";
import {getProductGroupParent} from "../../../services";

export const AddModalProductGroup: React.FC<AddModalProps<TypeProductGroup>> = ({
                                                                                  isOpen,
                                                                                  addItem,
                                                                                  onCancel,
                                                                                }) => {
  const [form] = Form.useForm();
  const [allProductGroupParent, setAllProductGroupParent] = useState<TypeProductGroup[]>([]);

  useEffect(() => {
    getProductGroupParent().then(setAllProductGroupParent);
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('values' ,values);
        form.resetFields();
        addItem({...values, parent: values.parent}); // Изменено
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Добавление новой группы товаров"
      open={isOpen}
      onCancel={onCancel}
      width={650}
      okText="Сохранить"
      cancelText="Отмена"
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{modifier: "public"}}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Название"
          name="title"
          rules={[{required: true, message: "введите название группы"}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Родительская группа"
          name="parent">
          <Select placeholder="Выберите родительскую группу">
            {allProductGroupParent.map((group) => (
              <Select.Option key={group.id} value={group.id}>
                {group.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};