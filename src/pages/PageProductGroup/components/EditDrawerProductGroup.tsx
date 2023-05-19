import React, {useEffect, useState} from "react";
import {Form, Input, Drawer, Select, Space, Button} from "antd";
import {EditDrawerProps, TypeProductGroup} from "../../../types";
import {getAllProductGroup, getProductGroupById} from "../../../services";

export const EditDrawerProductGroup: React.FC<EditDrawerProps<TypeProductGroup>> = ({
                                                                                      isOpen,
                                                                                      selectedItemId,
                                                                                      updateItem,
                                                                                      closeDrawer,
                                                                                    }) => {
  const [form] = Form.useForm();
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>([]);
  const [selectedProductGroupParent, setSelectedProductGroupParent] = useState<TypeProductGroup>();

  // Изменить выбранный группу товаров
  const onChangeProductGroupParent = (value: string): TypeProductGroup | undefined => {
    const selectedProductGroupParent =
      allProductGroup?.find(ProductGroupParent => ProductGroupParent.id === parseInt(value));
    form.setFieldsValue({parent: selectedProductGroupParent});
    setSelectedProductGroupParent(selectedProductGroupParent);
    return selectedProductGroupParent;
  };

  // Функция подтверждения редактирования
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('values', values);
        updateItem(values);
        closeDrawer()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }


  // Функция закрытия дравера
  const handleClose = () => {
    closeDrawer();
    form.resetFields();
  };

  useEffect(() => {
    getAllProductGroup().then(setAllProductGroup);
  }, []);

  useEffect(() => {
    if (selectedItemId !== undefined) {
      getProductGroupById(selectedItemId).then((data) => {
        form.setFieldsValue({
          id: data?.id,
          title: data?.title,
          parent: data?.parent?.id
        });
        setSelectedProductGroupParent(data?.parent)
      });
    }
  }, [selectedItemId, form]);

  return (
    <Drawer
      title={`Редактирование группы товаров`}
      open={isOpen}
      onClose={closeDrawer}
      width={650}
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
          name="id"
          style={{display: 'none'}}
        >
          <Input type="hidden"/>
        </Form.Item>
        <Form.Item
          label="Название"
          name="title"
          rules={[{required: true, message: 'Введите название группы'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Родительская группа"
          name="parent"
        >
          <div>
            <Select
              placeholder="Выберите родительскую группу"
              value={selectedProductGroupParent ? selectedProductGroupParent.title : undefined}
              onChange={onChangeProductGroupParent}
            >
              {allProductGroup.map(group => (
                <Select.Option key={group.id} value={group.id}>{group.title}</Select.Option>
              ))}
            </Select>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
};