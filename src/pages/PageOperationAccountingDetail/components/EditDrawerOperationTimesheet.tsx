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

  // Изменить выбранного сотрудника
  const onChangeEmployee = (value: string): TypeEmployee | undefined => {
    const selectedEmployee = allEmployee?.find(employee => employee.id === parseInt(value));
    form.setFieldsValue({employee: selectedEmployee});
    setSelectedEmployee(selectedEmployee)
    return selectedEmployee
  };

  // Поиск по сотрудникам
  const onSearchEmployee = useCallback((searchText: string) => {
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
      setFilteredEmployee(prevState => filtered || prevState);
    }
  }, [allEmployee]);

  // Функция подтверждения добавления сотрудника в табель учета рабочего времени
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
        closeDrawer()
        onSearchEmployee('');
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
    closeDrawer();
  };

  // Функция для получения информации о табеле учета рабочего времени и установления значений полей формы
  const getOperationTimesheet = useCallback(async (itemId: number) => {
    const operationTimesheet = await getOperationTimesheetById(itemId);
    form.setFieldsValue({
      hours: operationTimesheet?.hours,
      employee: operationTimesheet?.employee,
      fact: operationTimesheet?.fact,
    });
    setSelectedEmployee(operationTimesheet?.employee);
  }, []);

  useEffect(() => {
    if (selectedItemId) {
      getOperationTimesheet(selectedItemId).catch((error) => console.error(error));
    } else {
      setSelectedEmployee(undefined);
    }
  }, [selectedItemId]);

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
              value={selectedEmployee
                ? (
                  `${selectedEmployee?.lastName} ${selectedEmployee?.firstName}`
                ) : undefined}
              onChange={onChangeEmployee}
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
          <InputNumber style={{width: "100%"}} min={0}/>
        </Form.Item>
        <Form.Item
          label="Часы"
          name="hours"
          rules={[{required: true, message: 'напишите часы'}]}
        >
          <InputNumber style={{width: "100%"}} min={0}/>
        </Form.Item>
      </Form>
    </Drawer>
  )
}