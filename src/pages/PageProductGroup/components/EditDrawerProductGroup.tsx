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

  // Все товарные группы, выбранная товарная группа
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<TypeProductGroup>();
  const [filteredGroup, setFilteredGroup] = useState<TypeProductGroup[]>([]);

  // Изменить выбранную товарную группу
  const onChangeProductGroup = (value: string): void => {
    const selectedGroup = allProductGroup?.find(productGroup => productGroup.id === parseInt(value));
    form.setFieldsValue({
      parent: selectedGroup ? selectedGroup : undefined
    });
    setSelectedGroup(selectedGroup);
  };

  // Поиск по товарным группам
  const onSearchGroup = (searchText: string) => {
    if (searchText === '') {
      setFilteredGroup(allProductGroup || []);
    } else {
      const searchLowerCase = searchText.toLowerCase();
      const filtered = allProductGroup?.filter((productGroup) =>
        productGroup?.title
          ? productGroup.title.toLowerCase().includes(searchLowerCase)
          : false
      );
      setFilteredGroup(filtered || []);
    }
  };

  // Функция для получения данных о группе товаров по id обновление формы
  const handleGetProductGroupId = useCallback(() => {
    if (selectedItemId !== undefined) {
      getProductGroupById(selectedItemId).then((data) => {
        form.setFieldsValue({
          title: data?.title,
          parent: data?.parent?.id
        });
        setSelectedGroup(data?.parent)
      });
    }
  }, [selectedItemId, form]);

  // Функция подтверждения редактирования
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        updateItem({...values});
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
      getAllProductGroup().then(productGroup => {
        setAllProductGroup(productGroup);
        setFilteredGroup(productGroup);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      handleGetProductGroupId();
    } else {
      form.resetFields();
    }
  }, [isOpen, handleGetProductGroupId, form]);

  return (
    <Drawer
      title={`Редактирование группы товаров`}
      open={isOpen}
      onClose={closeDrawer}
      width={680}
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
          rules={[{required: true, message: 'введите название группы товаров'}]}
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
              value={selectedGroup ? selectedGroup?.title : undefined}
              onSearch={onSearchGroup}
              onChange={onChangeProductGroup}
            >
              {filteredGroup?.map((productGroup) => (
                <Option key={productGroup.id} value={productGroup.id} title={productGroup.title}>
                  {productGroup.title}
                </Option>
              ))}
            </Select>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
