import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

const { Option } = Select;

interface DataType {
  key: React.Key;
  name: string;
  parentId?: number | null;
  children?: DataType[];
}


// Здесь будут данные с сервера
const initialData: DataType[] = [
  // ...
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

const ProductGroupTree: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Здесь загружаем данные с сервера
  }, []);

  const onCreate = (values: any) => {
    // Здесь отправляем запрос на сервер для создания новой группы товаров
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Новая группа товаров
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="key"
      />
      <Modal
        visible={visible}
        title="Создать новую группу товаров"
        okText="Создать"
        cancelText="Отмена"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="name"
            label="Название"
            rules={[
              {
                required: true,
                message: 'Введите название группы товаров',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="parentId" label="Родительская группа">
            <Select
              allowClear
              placeholder="Выберите родительскую группу"
              style={{ width: '100%' }}
            >
              {data.map((item: DataType) => (
                <Option key={item.key} value={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductGroupTree;
