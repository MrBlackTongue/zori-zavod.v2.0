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
  const [allProductGroupParent, setAllProductGroupParent] = useState<TypeProductGroup[]>([]);
 // const [selectedParentGroup, setSelectedParentGroup] = useState<TypeProductGroup>();
  //const [filteredParentGroup, setFilteredParentGroup] = useState<TypeProductGroup[]>([]);

  useEffect(() => {
    getAllProductGroup().then(setAllProductGroupParent);
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('values', values);
        form.resetFields();
        addItem({...values, parent: values.parent}); // Изменено
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  //Поиск по товарам
  // const onSearchParentGroup = (searchText: string) => {
  //   if (searchText === '') {
  //     setFilteredParentGroup(allProductGroupParent || []);
  //   } else {
  //     const searchLowerCase = searchText.toLowerCase();
  //     const filtered = allProductGroupParent?.filter((productGroupParent) => {
  //       const titleMatch = productGroupParent && productGroupParent?.parent?.title
  //         ? productGroupParent?.parent?.title.toLowerCase().includes(searchLowerCase)
  //         : false;
  //
  //       return titleMatch;
  //     });
  //     setFilteredParentGroup(prevState => filtered || prevState);
  //   }
  // };

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
          <div>
            <Select
              showSearch
              allowClear
              filterOption={false}
              placeholder="Выберите родительскую группу"
             // value={selectedParentGroup ? selectedParentGroup?.title : undefined}
             // onSearch={onSearchParentGroup}
              >
              {allProductGroupParent.map((group) => (
                <Option key={group.id} value={group.id}>
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