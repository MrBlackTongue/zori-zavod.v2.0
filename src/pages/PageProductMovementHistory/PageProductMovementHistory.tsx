import React, {useState} from 'react';
import {Typography, Space, Button, Input} from 'antd';
import {SearchOutlined, SyncOutlined} from '@ant-design/icons';
import '../../App.css'
import {TableProductMovementHistory} from "./components/TableProductMovementHistory";

const {Title} = Typography;


export const PageProductMovementHistory: React.FC = () => {

  // Товары в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);
  const searchTable = (value: string) => {
    //setSearchText(value);
  }

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>История движения товаров</Title>
        <Space>
          <Input
            placeholder="Ячейка на складе"
            onChange={(event) => searchTable(event.target.value)}
            style={{width: '210px'}}
            allowClear
            prefix={<SearchOutlined/>}
          />
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            Обновить
          </Button>
        </Space>
      </div>
      <TableProductMovementHistory        openDrawer={() => {}}
        isUpdateTable={updateTable}
      />
    </div>
  );
}