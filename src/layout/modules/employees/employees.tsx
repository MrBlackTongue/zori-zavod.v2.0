import React, {useEffect, useState, useRef} from 'react';
import {
  Typography,
  Space,
  Button,
  Input,
  Form,
  Drawer,
  InputNumber,
  message,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import './employees.css';
import {
  getAllEmployees,
  postNewEmployee,
} from "../../../requests/EmployeeRequests";
import {AddEmployeeProps, EmployeeType, TableParams} from "../../../types/employeeType";
import {AddEmployee} from "./addEmployee";
import {EmployeesTable} from "./employeesTable";
import {EditEmployee} from "./editEmployee";

const {Title} = Typography;

const Employees: React.FC = () => {

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [allEmployees, setAllEmployees] = useState<EmployeeType[]>();
  const [updateTable, setUpdateTable] = useState(false);

  const [employee, setEmployee] = useState<EmployeeType | null>(null);
  const [updateButton, setUpdateButton] = useState('Обновить')

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | undefined>();

  const onCreate = (values: { [key: string]: any }): EmployeeType => {
    const employee: EmployeeType = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
      id: values.number,
    };
    setIsModalOpen(false)
    postNewEmployee(employee);
    updateEmployeeTable()
    return employee;
  };

  const updateEmployeeTable = () => {
    setUpdateButton('Обновление');
    setUpdateTable(!updateTable)
    getAllEmployees(setAllEmployees);
    setUpdateButton('Обновить');
  }

  // const updateEmployeeTable = async () => {
  //   await setLoading(true);
  //   console.log('loading', loading)
  //   // getAllEmployees(setAllEmployees);
  //   await setUpdateTable(!updateTable)
  //   await setLoading(false);
  // }

  // const updateEmployeeTable = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     updateEmployeeTable();
  //     setLoading(false);
  //   }, 2000);
  // }


  useEffect(() => {
    if (employee) {
      form.setFieldsValue(employee);
    }
  }, [employee, form]);

  // Drawer
  const openDrawer = () => {
    setIsDrawerOpen(true);
    // setSelectedEmployeeId(employeeId)
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const onFinish = (values: EmployeeType) => {
    console.log('SuccessModal:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleDrawerOpen = (open: boolean) => {
    setIsDrawerOpen(open);
  }

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined spin={loading}/>}
            onClick={updateEmployeeTable}
            className='greenButton'>
            {updateButton}
            {/*{loading ? 'Обновление' : 'Обновить'}*/}
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
      <EmployeesTable
        updateTable={updateTable}
        updateEmployeeTable={updateEmployeeTable}
        openDrawer={openDrawer}
      />
      <AddEmployee
        open={isModalOpen}
        onCreate={onCreate}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditEmployee
        isOpen={isDrawerOpen}
        selectedEmployeeId={selectedEmployeeId}
        closeDrawer={closeDrawer}
        onFinish={onFinish}
      />
    </div>
  );
};

export default Employees;