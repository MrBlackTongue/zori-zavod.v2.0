import React, {useState, useEffect} from 'react';
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
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import './unit.css';
import type {ColumnsType, TableProps} from 'antd/es/table';

const {Title} = Typography;

const Unit = () => {

  interface DataType {
    key: React.Key;
    unit: string;
    // id: number;
  }

  const dataSource = [
    {
      key: '1',
      unit: 'аппарат',
      id: (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => {
                showModal()
                setModalTitle('Редактирование')
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
              title="Вы действительно хотите удалить эту единицу измерения?"
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
      unit: 'банка',
      id: (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => {
                showModal()
                setModalTitle('Редактирование')
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
              title="Вы действительно хотите удалить эту единицу измерения?"
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
      title: 'Название',
      dataIndex: 'unit',
      key: 'unit',
      sorter: (a, b) => a.unit < b.unit ? -1 : 1,
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
  // const [isChangeUnit] = useState('Редактирование')
  // const [isAddUnit, isChangeUnit] = useDocTitle("Добавление новой");
  const [modalTitle, setModalTitle] = useState("Добавление новой");

  // useEffect(() => {
  //   document.title = `Редактирование`;
  // });

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

  const onFinish = (values: string) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Единицы измерения</Title>
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
            onClick={() => {
              showModal()
              setModalTitle('Добавление новой')
            }
          }
          >
            Добавить
          </Button>
        </Space>
      </div>
      <Table columns={columns} dataSource={dataSource} onChange={onChange}/>
      <Modal
        title={`${modalTitle} единицы измерения`}
        open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        width={660}
        okText={'Добавить'}
        cancelText={'Отмена'}
        footer={[
          <Button form='add-new-unit' type="primary" htmlType="submit">
            <CheckOutlined/>Сохранить
          </Button>,
          <Button form='add-new-unit' onClick={handleCancel}>
            Отмена
          </Button>
        ]}
      >
        <Form
          id='add-new-unit'
          name="add-new-unit"
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
            label="Название"
            name="unit"
            rules={[{required: true, message: 'Пожалуйста введите название единицы измерения'}]}
          >
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Unit;