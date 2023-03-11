import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Typography,
  Space,
  Button,
  Form,
  Tabs,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import '../../App.css'
import './PageOperations.css';
import {postNewOperation, putChangeOperation} from "../../services";
import {OperationTypes} from "../../types";
import {AddModalOperation, TableOperations, EditDrawerOperation} from "../../components";
import {Link} from 'react-router-dom';

const {Title} = Typography;
const {TabPane} = Tabs;

const PageOperations: React.FC = () => {

  const [form] = Form.useForm();

  const navigate = useNavigate();

  // Обновить лоудер, обновить тект кнопки "Обновить" todo: сделать анимационную кнопку обновления
  const [loading] = useState(false);
  const [updateButton] = useState('Обновить')

  // Типы операций в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новый тип операции
  const [operation] = useState<OperationTypes | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть тип операции по id
  const [selectedOperationId, setSelectedOperationId] = useState<number>();

  const handleTabClick = (key: string) => {
    switch (key) {
      case 'employees':
        navigate('/employees');
        break;
      case 'operations':
        navigate('/operations');
        break;
      default:
        break;
    }
  };

  const addOperation = (values: { [key: string]: any }): OperationTypes => {
    const operation: OperationTypes = {
      title: values.title,
      unit: {
        id: values.unit.id,
        name: values.unit.name,
      },
      rate: values.rate,
    };
    setIsModalOpen(false)
    postNewOperation(operation)
    setUpdateTable(!updateTable)
    return operation;
  };

  useEffect(() => {
    if (operation) {
      form.setFieldsValue(operation);
    }
  }, [operation, form]);

  // Drawer
  const openDrawer = (operationId: number) => {
    setSelectedOperationId(operationId)
    setIsDrawerOpen(true);
  };

  const updateOperation = (values: { [key: string]: any }): OperationTypes => {
    const operation: OperationTypes = {
      title: values.title,
      unit: {
        id: values.unit.id,
        name: values.unit.name,
      },
      rate: values.rate,
      id: selectedOperationId,
    };
    setIsDrawerOpen(false)
    putChangeOperation(operation)
    setUpdateTable(!updateTable)
    return operation
  };

  return (
    // <Tabs onTabClick={handleTabClick}>
    //   <TabPane
    //     tab={
    //       <span>
    //             <CalendarOutlined/>
    //             Учет операций
    //           </span>
    //     }
    //     key="employees">
    //   </TabPane>
    //   <TabPane
    //     tab={
    //       <span>
    //             <CalendarOutlined/>
    //             Типы операций
    //           </span>
    //     }
    //     key="operations">
        <div style={{display: 'grid'}}>
          <div className='centerTitle'>
            <Title level={3}>Типы операций</Title>
            <Space>
              <Button
                type="dashed"
                icon={<SyncOutlined spin={loading}/>}
                onClick={() => setUpdateTable(!updateTable)}
                className='greenButton'>
                {updateButton}
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined/>}
                onClick={() => {
                  setIsModalOpen(true)
                }}
              >
                Добавить
              </Button>
            </Space>
          </div>
          <TableOperations
            updateTable={updateTable}
            openDrawer={openDrawer}
          />
          <AddModalOperation
            isOpen={isModalOpen}
            addOperation={addOperation}
            onCancel={() => {
              setIsModalOpen(false)
            }}
          />
          <EditDrawerOperation
            isOpen={isDrawerOpen}
            selectedOperationId={selectedOperationId}
            updateOperation={updateOperation}
            closeDrawer={() => {
              setIsDrawerOpen(false);
            }}
          />
        </div>
        // <Link to="/operations">Типы операций</Link>
      // </TabPane>
    // </Tabs>

  );
}

export default PageOperations;