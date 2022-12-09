import React from 'react';
import {Typography, Space, Button, Table, Tooltip, Popconfirm} from 'antd';
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

const Staff = () => (
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
          {'Обновление'}
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined/>}
          onClick={() => {
            // this.setState({
            //   downloadModal: true,
            // });
          }}>
          Добавить
        </Button>
      </Space>
    </div>
    <Table columns={columns} dataSource={dataSource}/>
  </div>

);

export default Staff;