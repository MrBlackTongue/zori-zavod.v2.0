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

  // Все товарные группы, выбранная товарная группа, отфильтрованные товарные группы
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>([]);
  const [selectedProductGroup, setSelectedProductGroup] = useState<TypeProductGroup>();
  const [filteredProductGroup, setFilteredProductGroup] = useState<TypeProductGroup[]>([]);

  // Изменить выбранную товарную группу
  const onChangeProductGroup = (value: string): void => {
    const selectedProductGroup = allProductGroup?.find(productGroup => productGroup.id === parseInt(value));
    form.setFieldsValue({
      parent: selectedProductGroup ? selectedProductGroup : undefined
    });
    setSelectedProductGroup(selectedProductGroup);
  };

  //Поиск по родительским группам
    const onSearchProductGroup = (searchText: string): void => {
      if (searchText === '') {
        setFilteredProductGroup(allProductGroup || []);
      } else {
        const searchLowerCase = searchText.toLowerCase();
        const filtered = allProductGroup?.filter((productGroupParent) =>
          productGroupParent?.title
            ? productGroupParent.title.toLowerCase().includes(searchLowerCase)
            : false
        );
        setFilteredProductGroup(prevState => filtered || prevState);
      }
    };

  // Функция для получения данных о группе товаров по id обновление формы
  const handleGetParent = useCallback((): void => {
    if (selectedItemId) {
      getProductGroupById(selectedItemId).then((data) => {
        form.setFieldsValue({
          id: data?.id,
          title: data?.title,
          parent: data?.parent,
        });
        setSelectedProductGroup(data?.parent)
      });
    }
  }, [selectedItemId, form]);

  // Функция подтверждения редактирования
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
        closeDrawer();
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      });
  };

  // Функция закрытия дравера
  const handleClose = (): void => {
    closeDrawer();
    form.resetFields();
  };

  useEffect(() => {
    if (isOpen) {
      getAllProductGroup().then(groups => {
        setAllProductGroup(groups);
        setFilteredProductGroup(groups);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      handleGetParent();
    } else {
      form.resetFields();
    }
  }, [isOpen, handleGetParent, form]);

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
              value={selectedProductGroup ? selectedProductGroup?.title : undefined}
              onSearch={onSearchProductGroup}
              onChange={onChangeProductGroup}
            >
              {filteredProductGroup?.map((group) => (
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
