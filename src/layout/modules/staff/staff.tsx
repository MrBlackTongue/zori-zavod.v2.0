import React, {useState} from 'react';
import {
  Typography,
  Space,
  Button,
  Table,
  Tooltip,
  Popconfirm,
  Modal,
  Input,
  Form,
  Checkbox,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './staff.css';

const {Title} = Typography;

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    surname: 'John',
    number: '6385649536',
    price: 32,
    staff: 'Да',
    id: (
      <Space>
        <Tooltip title="Изменить" placement="bottomRight">
          <Button
            type="primary"
            size="small"
            shape="circle"
            ghost
            onClick={() => {
              // this.getBlocksInfo(id);
              // this.setState({
              //   editModal: true,
              // });
            }}>
            <EditOutlined/>
          </Button>
        </Tooltip>
        <Tooltip title="Удалить" placement="bottomRight">
          <Popconfirm
            title="Вы действительно хотите удалить этого сотрудника?"
            onConfirm={() => {
              // this.deleteBlockInfo(id);
            }}
            okText="Да"
            cancelText="Отмена">
            <Button type="primary" size="small" shape="circle" ghost onClick={() => {
            }}>
              <DeleteOutlined/>
            </Button>
          </Popconfirm>
        </Tooltip>
      </Space>
    ),
  },
  {
    key: '2',
    name: 'John',
    surname: 'Mike',
    number: '347547530',
    price: 42,
    staff: 'Да',
    id: (
      <Space>
        <Tooltip title="Изменить" placement="bottomRight">
          <Button
            type="primary"
            size="small"
            shape="circle"
            ghost
            onClick={() => {
              // this.getBlocksInfo(id);
              // this.setState({
              //   editModal: true,
              // });
            }}>
            <EditOutlined/>
          </Button>
        </Tooltip>
        <Tooltip title="Удалить" placement="bottomRight">
          <Popconfirm
            title="Вы действительно хотите удалить этого сотрудника?"
            onConfirm={() => {
              // this.deleteBlockInfo(id);
            }}
            okText="Да"
            cancelText="Отмена">
            <Button type="primary" size="small" shape="circle" ghost onClick={() => {
            }}>
              <DeleteOutlined/>
            </Button>
          </Popconfirm>
        </Tooltip>
      </Space>
    ),
  },
];

const columns = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Фамилия',
    dataIndex: 'surname',
    key: 'surname',
  },
  {
    title: 'Телефон',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Ставка',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Нанят',
    dataIndex: 'staff',
    key: 'staff',
  },
  {
    title: 'Действия',
    dataIndex: 'id',
    key: 'id',
  },
];

const Staff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: string) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="dashed"
            // icon={<SyncOutlined spin={this.state.loading} />}
            icon={<SyncOutlined/>}
            // onClick={this.getBlocks}
            className='greenButton'>
            {/*{this.state.loading ? 'Обновление' : 'Обновить'}*/}
            {'Обновить'}
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={showModal}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <Table columns={columns} dataSource={dataSource}/>
      <Modal
        title={`Добавление нового сотрудника`}
        open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        width={500}
        okText={'Добавить'}
        cancelText={'Отмена'}
      >
        <Form
          name="add-new-worker"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{marginTop: 30}}
        >
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Пожалуйста введите имя' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Фамилия"
            name="surname"
            rules={[{ required: true, message: 'Пожалуйста введите фамилию' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Телефон"
            name="phoneNumber"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ставка"
            name="salary"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="hired"
            valuePropName="hired"
            wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Нанят</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Staff;