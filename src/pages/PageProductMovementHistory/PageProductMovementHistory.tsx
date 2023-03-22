import React, {useState} from 'react';
import {Typography, Space, Button} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import '../../App.css'

const {Title} = Typography;

export const PageProductMovementHistory: React.FC = () => {

  // Товары в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>История движения товаров</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            Обновить
          </Button>
        </Space>
      </div>
    </div>
  );
}