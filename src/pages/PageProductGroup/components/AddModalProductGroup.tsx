import React, {useState, useEffect} from "react";
import {Form, Input, Modal, Select} from "antd";
import {AddModalProps, TypeProductGroup} from "../../../types";
import {getAllProductGroup} from "../../../services";

const {Option} = Select;

export const AddModalProductGroup: React.FC<AddModalProps<TypeProductGroup>> = ({
                                                                                  isOpen,
                                                                                  addItem,
                                                                                  onCancel,
                                                                                }) => {
  const [form] = Form.useForm();

  // Все группы товаров, выбранная группа, отфильтрованная группа
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<TypeProductGroup>();
  const [filteredGroup, setFilteredGroup] = useState<TypeProductGroup[]>([]);

  // Изменить выбранную группу товаров
  const onChangeProductGroup = (value: string): void => {
    const selectedGroup = allProductGroup?.find(productGroup => productGroup.id === parseInt(value));
    form.setFieldsValue({
      parent: selectedGroup ? selectedGroup.id : undefined
    });
    setSelectedGroup(selectedGroup);
  };

  // Поиск по группе
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

  // Функция подтверждения добавления новой группы
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addItem(values);
        setSelectedGroup(undefined);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Функция закрытия модального окна
  const handleClose = () => {
    form.resetFields();
    setSelectedGroup(undefined);
    onCancel()
  };

  useEffect(() => {
    if (isOpen) {
      getAllProductGroup().then(allProductGroup => {
        setAllProductGroup(allProductGroup);
        setFilteredGroup(allProductGroup);
      });
    }
  }, [isOpen]);

  return (
    <Modal
      title="Добавление новой группы товаров"
      open={isOpen}
      onCancel={handleClose}
      width={680}
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
    </Modal>
  );
};