import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton} from 'antd';
import {SyncOutlined} from "@ant-design/icons";
import '../../App.css'
import {TableCostReport} from "./components/TableCostReport";

export const PageCostReport: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Отчет по себестоимости</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableCostReport
        isUpdateTable={isUpdateTable}
      />
    </div>
  );
}