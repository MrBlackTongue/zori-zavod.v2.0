import React, {useCallback, useEffect, useState} from "react";
import {Form, Input, Drawer, Select, Space, Button} from "antd";
import {EditDrawerProps, TypeProductGroup} from "../../../types";
import {getAllProductGroup, getProductGroupById} from "../../../services";

const {Option} = Select;

export const EditDrawerProductGroup: React.FC<EditDrawerProps<TypeProductGroup>> = ({
                                                                                      isOpen,
                                                                                      selectedItemId,
                                                                                      updateItem,
                                                                                      closeDrawer,
                                                                                    }) => {
  const [form] = Form.useForm();
  const [allProductGroupParent, setAllProductGroupParent] = useState<TypeProductGroup[]>([]);
  const [selectedParentGroup, setSelectedParentGroup] = useState<TypeProductGroup>();
  const [filteredParentGroup, setFilteredParentGroup] = useState<TypeProductGroup[]>([]);

  //Поиск по товарам
  const onSearchParentGroup = (searchText: string) => {
    if (searchText === '') {
      setFilteredParentGroup(allProductGroupParent || []);
    } else {
      const searchLowerCase = searchText.toLowerCase();
      const filtered = allProductGroupParent?.filter((productGroupParent) =>
        productGroupParent?.title
          ? productGroupParent.title.toLowerCase().includes(searchLowerCase)
          : false
      );
      setFilteredParentGroup(filtered || []);
    }
  };

  // Изменить выбранный группу товаров
  const onChangeProductGroup = (value: string): void => {
    const selectedParentGroup = allProductGroupParent?.find(productGroup => productGroup.id === parseInt(value));
    form.setFieldsValue({
      parent: selectedParentGroup ? selectedParentGroup.id : undefined
    });
    setSelectedParentGroup(selectedParentGroup);
  };

  const handleGetParentId = useCallback(() => {
    if (selectedItemId !== undefined) {
      getProductGroupById(selectedItemId).then((data) => {
        form.setFieldsValue({
          id: data?.id,
          title: data?.title,
          parent: data?.parent?.id
        });
        setSelectedParentGroup(data?.parent)
      });
    }
  }, [selectedItemId, form]);

  // Функция подтверждения редактирования
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('values', values);
        updateItem({...values, parent: values.parent ? values.parent : null}); // Изменено
        closeDrawer();
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      });
  };

  // Функция закрытия дравера
  const handleClose = () => {
    closeDrawer();
    form.resetFields();
  };

  useEffect(() => {
    if (isOpen) {
      getAllProductGroup().then(groups => {
        setAllProductGroupParent(groups);
        setFilteredParentGroup(groups);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      handleGetParentId();
    } else {
      form.resetFields();
    }
  }, [isOpen, handleGetParentId, form]);

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
          name="parent">
          <div>
            <Select
              showSearch
              allowClear
              filterOption={false}
              placeholder="Выберите родительскую группу"
              value={selectedParentGroup ? selectedParentGroup?.title : undefined}
              onSearch={onSearchParentGroup}
              onChange={onChangeProductGroup}
            >
              {filteredParentGroup?.map((group) => (
                <Option key={group.id} value={group.id} title={group.title}>
                  {group.title}
                </Option>
              ))}
            </Select>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
