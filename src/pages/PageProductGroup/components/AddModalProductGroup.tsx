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

  // Все родительские группы товаров, выбранная родительская группа, отфильтрованная родительская группа
  const [allProductGroupParent, setAllProductGroupParent] = useState<TypeProductGroup[]>([]);
  const [selectedParentGroup, setSelectedParentGroup] = useState<TypeProductGroup>();
  const [filteredParentGroup, setFilteredParentGroup] = useState<TypeProductGroup[]>([]);

  // Изменить выбранный группу товаров
  const onChangeProductGroup = (value: string): void => {
    const selectedParentGroup = allProductGroupParent?.find(productGroup => productGroup.id === parseInt(value));
    form.setFieldsValue({
      parent: selectedParentGroup ? selectedParentGroup.id : undefined
    });
    setSelectedParentGroup(selectedParentGroup);
  };

  //Поиск по родительской группе
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

  // Функция подтверждения добавления новой родительской группы
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('values', values);
        form.resetFields();
        addItem({...values, parent: values.parent ? values.parent : null});
        setSelectedParentGroup(undefined);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  // Функция закрытия модальноо о
  const handleClose = () => {
    form.resetFields();
    setSelectedParentGroup(undefined);
    onCancel()
  };

  useEffect(() => {
    if (isOpen) {
      getAllProductGroup().then(groups => {
        setAllProductGroupParent(groups);
        setFilteredParentGroup(groups);
      });
    }
  }, [isOpen]);

  return (
    <Modal
      title="Добавление новой группы товаров"
      open={isOpen}
      onCancel={handleClose}
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
    </Modal>
  );
};