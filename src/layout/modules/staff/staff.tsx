import React, {useEffect, useState} from 'react';
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
  FloatButton,
} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import './staff.css';

const {Title} = Typography;

const Staff = () => {

  interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    phone: string
    salaryRate: number;
    hired: boolean;
    id: number;
  }

  interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
  }

  const dataSource = [
    {
      key: '1',
      firstName: 'Mike',
      lastName: 'John',
      phone: '6385649536',
      salaryRate: 32,
      // hired: 'Да',
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
      firstName: 'John',
      lastName: 'Mike',
      phone: '347547530',
      salaryRate: 42,
      // hired: 'Да',
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
      // sorter: true,
      // render: (a, b) => a.firstName < b.firstName ? -1 : 1,
      // sorter: (a, b) => a.firstName < b.firstName ? -1 : 1,
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
      // defaultSortOrder: 'ascend',
      // sorter: true,
      // render: (a, b) => a.lastName < b.lastName ? -1 : 1,
      // sorter: (a, b) => a.lastName < b.lastName ? -1 : 1,

    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Ставка',
      dataIndex: 'salaryRate',
      key: 'salaryRate',
      // sorter: true,
      // render: (a, b) => a.salaryRate - b.salaryRate,
      // sorter: (a, b) => a.salaryRate - b.salaryRate,

    },
    {
      title: 'Нанят',
      dataIndex: 'hired',
      key: 'hired',
      render: ((hired) => {
        return 'Да'
      }),
      // sorter: (a, b) => a.hired < b.hired ? -1 : 1,

    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
  ];

  // const getRandomuserParams = (params: TableParams) => ({
  //   results: params.pagination?.pageSize,
  //   page: params.pagination?.current,
  //   ...params,
  // });

  // старое, удалить
  // const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  //   console.log('params', pagination, filters, sorter, extra);
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOOpen] = useState(false);

  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(`http://localhost:8080/api/employee`)
      .then((res) => res.json())
      .then(( results ) => {
        setData(results);
        console.log('results', results)
        console.log('data', data)
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            // total: 100,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);


  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<DataType>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

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
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined spin={loading} />}
            onClick={fetchData}
            className='greenButton'>
            {loading ? 'Обновление' : 'Обновить'}
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
      <Table
        columns={columns}
        dataSource={data}
        // rowKey={(record) => record.lastName}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        style={{ height: '200vh'}} // удалить, стиль был создан для проверки кнопки FloatButton
      />
      <FloatButton.BackTop />

      <Modal
        title={`Добавление нового сотрудника`}
        open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        width={500}
        okText={'Добавить'}
        cancelText={'Отмена'}
        footer={[
          <Button form='add-new-worker' type="primary" htmlType="submit">
            <CheckOutlined/>Добавить
          </Button>,
          <Button form='add-new-worker' onClick={handleCancel}>
            Отмена
          </Button>
        ]}
      >
        <Form
          id='add-new-worker'
          name="add-new-worker"
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
            label="Имя"
            name="name"
            rules={[{required: true, message: 'Пожалуйста введите имя'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Фамилия"
            name="surname"
            rules={[{required: true, message: 'Пожалуйста введите фамилию'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Телефон"
            name="phoneNumber"
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Ставка"
            name="salary"
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="hired"
            valuePropName="hired"
            wrapperCol={{offset: 8, span: 16}}>
            <Checkbox>Нанят</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        title="Редактирование сотрудника"
        width={600}
        onClose={onCloseDrawer}
        open={isDrawerOpen}
        bodyStyle={{paddingBottom: 80}}
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
          id='change-worker'
          name="change-worker"
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
            label="Имя"
            name="name"
            rules={[{required: true, message: 'Пожалуйста введите имя'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Фамилия"
            name="surname"
            rules={[{required: true, message: 'Пожалуйста введите фамилию'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Телефон"
            name="phoneNumber"
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Ставка"
            name="salary"
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="hired"
            valuePropName="hired"
            wrapperCol={{offset: 8, span: 16}}>
            <Checkbox>Нанят</Checkbox>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Staff;