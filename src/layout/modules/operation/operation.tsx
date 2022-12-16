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
  Drawer,
  Select,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import './operation.css';
import type {ColumnsType, TableProps} from 'antd/es/table';

const {Title} = Typography;
const { Option } = Select;

const Operation = () => {

  interface DataType {
    key: React.Key;
    operationName: string;
    units: string;
    norm: number;
    withExpenses: string,
    // id: number;
  }

  const dataSource = [
    {
      key: '1',
      operationName: 'Варка сиропа',
      units: 'аппарат',
      norm: 200,
      withExpenses: 'Нет',
      id: (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => {
                showDrawer()
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
              title="Вы действительно хотите удалить эту операцию?"
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
      operationName: 'Упаковка 1.8 банки',
      units: 'банка',
      norm: 140,
      withExpenses: 'Да',
      id: (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => {
                showDrawer()
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
              title="Вы действительно хотите удалить эту операцию?"
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'Операции',
      dataIndex: 'operationName',
      key: 'operationName',
      sorter: (a, b) => a.operationName < b.operationName ? -1 : 1,
    },
    {
      title: 'Единицы измерения',
      dataIndex: 'units',
      key: 'units',
    },
    {
      title: 'Норма',
      dataIndex: 'norm',
      key: 'norm',
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOOpen] = useState(false);

  // Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Drawer
  const showDrawer = () => {
    setIsDrawerOOpen(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerOOpen(false);
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
        <Title level={3}>Типы операций</Title>
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
      <Table columns={columns} dataSource={dataSource} onChange={onChange}/>
      <Modal
        title={`Добавление новой операции`}
        open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        width={660}
        okText={'Добавить'}
        cancelText={'Отмена'}
        footer={[
          <Button form='add-new-operation' type="primary" htmlType="submit">
            <CheckOutlined />Добавить
          </Button>,
          <Button form='add-new-worker' onClick={handleCancel}>
            Отмена
          </Button>
        ]}
      >
        <Form
          id='add-new-operation'
          name="add-new-operation"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{span: 6}}
          wrapperCol={{span: 16}}
          style={{marginTop: 30}}
        >
          <Form.Item
            label="Операция"
            name="operationName"
            rules={[{required: true, message: 'Пожалуйста введите название операции'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Единица измерения"
            name="surname"
            rules={[{required: true, message: 'Пожалуйста выберите единицу измерения'}]}
          >
            <Select
              allowClear
            >
              <Option value="banka">банка</Option>
              <Option value="kg">килограмм</Option>
              <Option value="shtuka">штук</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Норма"
            name="norm"
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="hired"
            valuePropName="hired"
            wrapperCol={{offset: 8, span: 16}}>
            <Checkbox>С расходами</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        title="Редактирование операции"
        width={660}
        onClose={onCloseDrawer}
        open={isDrawerOpen}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onCloseDrawer}>Отмена</Button>
            <Button onClick={onCloseDrawer} type="primary" form='change-worker' htmlType="submit">
              Сохранить
            </Button>
          </Space>
        }
      >
        <Form
          id='change-operation'
          name="change-operation"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{span: 6}}
          wrapperCol={{span: 16}}
          style={{marginTop: 30}}
        >
          <Form.Item
            label="Операция"
            name="operationName"
            rules={[{required: true, message: 'Пожалуйста введите название операции'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Единица измерения"
            name="surname"
            rules={[{required: true, message: 'Пожалуйста выберите единицу измерения'}]}
          >
            <Select
              allowClear
            >
              <Option value="banka">банка</Option>
              <Option value="kg">килограмм</Option>
              <Option value="shtuka">штук</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Норма"
            name="norm"
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="hired"
            valuePropName="hired"
            wrapperCol={{offset: 8, span: 16}}>
            <Checkbox>С расходами</Checkbox>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default Operation;