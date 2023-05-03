import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Form, InputNumber, Select, Space} from "antd";
import {EditDrawerProps, TypeEmployee, TypeOperationTimesheet} from "../../../types";
import {getAllEmployee, getOperationTimesheetById} from "../../../services";

const {Option} = Select;

export const EditDrawerOperationTimesheet: React.FC<EditDrawerProps<TypeOperationTimesheet>> = ({
                                                                                                  isOpen,
                                                                                                  selectedItemId,
                                                                                                  closeDrawer,
                                                                                                  updateItem,
                                                                                                }) => {
  const [form] = Form.useForm();

  // Все сотрудники, отфильтрованные сотрудники
  const [allEmployee, setAllEmployee] = useState<TypeEmployee[]>();
  const [filteredEmployee, setFilteredEmployee] = useState<TypeEmployee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<TypeEmployee>();
  const [employee, setEmployee] = useState<TypeEmployee>()

  // Изменить выбранного сотрудника
  const onChangeEmployee = (values: string, option: any): TypeEmployee | undefined => {
    if (values === undefined) {
      setSelectedEmployee(undefined);
      form.setFieldsValue({employee: undefined});
      return undefined;
    }
    const employee: TypeEmployee = {
      id: option.id,
    };
    form.setFieldsValue({
      employee: employee
    });
    setSelectedEmployee(employee)
    return employee
  };

  // Поиск по сотрудникам
  const onSearchEmployee = (searchText: string) => {
    if (searchText === '') {
      setFilteredEmployee(allEmployee || []);
    } else {
      const searchLowerCase = searchText.toLowerCase();
      const filtered = allEmployee?.filter((employee) => {

        const lastNameMatch = employee?.lastName && employee.lastName
          ? employee.lastName.toLowerCase().includes(searchLowerCase)
          : false;

        const firstNameMatch = employee?.firstName && employee.firstName
          ? employee.firstName.toLowerCase().includes(searchLowerCase)
          : false;

        return lastNameMatch || firstNameMatch;
      });
      setFilteredEmployee(filtered || []);
    }
  };

  // Функция подтверждения добавления сотрудника в табель учета рабочего времени
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
        closeDrawer()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  // Функция закрытия модального окна
  const handleClose = () => {
    form.resetFields();
    if (selectedItemId) {
      getOperationTimesheet(selectedItemId).catch((error) => {
        console.error("Ошибка при получении данных об учетной операции: ", error)
      });
    }
    setSelectedEmployee(employee);
    closeDrawer();
  };

  // Функция для получения информации о табеле учета рабочего времени и установления значений полей формы
  const getOperationTimesheet = useCallback(async (itemId: number) => {
    const operationTimesheet = await getOperationTimesheetById(itemId);
    console.log('operationTimesheet', operationTimesheet)
    // form.setFieldsValue({
    //   fact: operationTimesheet?.fact,
    //   operation: operationTimesheet?.operation,
    //   output: operationTimesheet?.output,
    // });
    // setSelectedEmployee(operationTimesheet?.employee);
    // setEmployee(operationTimesheet?.employee);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedItemId) {
        await getOperationTimesheet(selectedItemId);
      }
    };
    fetchData().catch((error) => {
      console.error("Ошибка при получении данных об учетной операции: ", error)
    });
  }, [selectedItemId, getOperationTimesheet]);

  useEffect(() => {
    getAllEmployee().then((allEmployee) => {
      setAllEmployee(allEmployee);
      setFilteredEmployee(allEmployee)
    });
  }, []);

  return (
    <Drawer
      title="Редактирование учетной операции"
      width={600}
      open={isOpen}
      onClose={handleClose}
      extra={
        <Space>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleOk} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
        // initialValues={{
        // }}
      >
        <Form.Item
          label="Сотрудник"
          name="employee"
          rules={[{type: 'object' as const, required: true, message: 'выберите сотрудника'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
              filterOption={false}
              onChange={onChangeEmployee}
              // onClear={onClearEmployee}
              onSearch={onSearchEmployee}
            >
              {filteredEmployee && filteredEmployee.length > 0 ?
                filteredEmployee.map(employee => (
                  <Option id={employee.id} key={employee.id} value={employee.id}>
                    {`${employee.lastName} ${employee.firstName}`}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Результат"
          name="fact"
        >
          <InputNumber style={{width: "100%"}}/>
        </Form.Item>
        <Form.Item
          label="Часы"
          name="hours"
          rules={[{required: true, message: 'напишите часы'}]}
        >
          <InputNumber style={{width: "100%"}}/>
        </Form.Item>
      </Form>
    </Drawer>
  )
}