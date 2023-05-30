import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Form, InputNumber, Select, Space} from "antd";
import {EditDrawerProps, TypeEmployee, TypeOperationTimesheet} from "../../../types";
import {getAllEmployee, getOperationTimesheetById} from "../../../services";

const {Option} = Select;

export const EditDrawerOperationTimesheet:
  React.FC<EditDrawerProps<TypeOperationTimesheet>> = ({
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
  const onChangeEmployee = (value: string): void => {
    const selectedEmployee = allEmployee?.find(employee => employee.id === parseInt(value));
    form.setFieldsValue({employee: selectedEmployee});
    setSelectedEmployee(selectedEmployee)
    onSearchEmployee('')
  };

  // Поиск по сотрудникам
  const onSearchEmployee = (searchText: string): void => {
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
  }

  // Функция подтверждения добавления сотрудника в табель учета рабочего времени
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
        closeDrawer()
        onSearchEmployee('');
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      })
  }

  // Функция закрытия модального окна
  const handleClose = (): void => {
    form.resetFields();
    if (selectedItemId) {
      handleGetOperationTimesheet(selectedItemId).catch((error) => {
        console.error("Ошибка при получении данных об учетной операции: ", error)
      });
    }
    closeDrawer();
  };

  // Функция для получения данных в дравер
  const handleGetOperationTimesheet = useCallback(async (itemId: number) => {
    const operationTimesheet = await getOperationTimesheetById(itemId);
    form.setFieldsValue({
      hours: operationTimesheet?.hours,
      employee: operationTimesheet?.employee,
      fact: operationTimesheet?.fact,
    });
    setSelectedEmployee(operationTimesheet?.employee);
  }, [form]);

  useEffect(() => {
    if (selectedItemId) {
      handleGetOperationTimesheet(selectedItemId).catch((error) => console.error(error));
    } else {
      setSelectedEmployee(undefined);
    }
  }, [selectedItemId, handleGetOperationTimesheet, form]);

  useEffect(() => {
    getAllEmployee().then((allEmployee) => {
      setAllEmployee(allEmployee);
      setFilteredEmployee(allEmployee)
    });
  }, []);

  return (
    <Drawer
      title="Редактирование табеля учета рабочего времени"
      width={700}
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
          rules={[{required: true, message: 'выберите сотрудника'}]}
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
          rules={[
            {required: true, message: 'напишите часы'},
            {type: 'number', min: 0.1, message: 'часы должны быть больше 0,1'}
          ]}
        >
          <InputNumber
            style={{width: "100%"}}
            min={0.1}
            formatter={(value) => `${value}`.replace('.', ',')}
            parser={(displayValue: string | undefined): number => {
              if (displayValue === undefined) {
                return 0;
              }
              return parseFloat(displayValue.replace(',', '.'));
            }}
          />
        </Form.Item>
      </Form>
    </Drawer>
  )
}