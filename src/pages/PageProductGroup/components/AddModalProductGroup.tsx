import { Form, Input, Modal, Select } from "antd";
import {useState, useEffect} from "react";
import {AddModalProps, TypeProductGroup} from "../../../types";
import {getAllProductGroup} from "../../../services";

export const AddModalProductGroup: React.FC<AddModalProps<TypeProductGroup>> = ({
                                                                                  isOpen,
                                                                                  addItem,
                                                                                  onCancel,
                                                                                }) => {
  const [form] = Form.useForm();
  const [productGroup, setProductGroup] = useState<TypeProductGroup[]>([]);
  const [selectedProductGroup, setSelectedProductGroup] = useState<TypeProductGroup[]>([]);

  useEffect(() => {
    // Замените эту функцию на вашу функцию для получения всех групп товаров
    getAllProductGroup().then(setProductGroup);
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        const parentGroup = productGroup.find(group => group.id === values.parent);
        addItem({ ...values, parent: parentGroup }); // parent теперь - это полный объект группы продуктов
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={`Добавление новой группы товаров`}
      open={isOpen}
      onCancel={onCancel}
      width={650}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{ modifier: 'public' }}
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
      </Form>
    </Modal>
  );
};
