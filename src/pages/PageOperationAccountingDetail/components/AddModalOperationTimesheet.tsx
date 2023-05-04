import React, {useState, useEffect, useCallback} from "react";
import {AddModalProps, TypeEmployee, TypeOperationTimesheet} from "../../../types";
import {Form, InputNumber, Modal, Select} from "antd";
import {getAllEmployee} from "../../../services";

const {Option} = Select;

export const AddModalOperationTimesheet: React.FC<AddModalProps<TypeOperationTimesheet>> = ({
                                                                                              isOpen,
                                                                                              addItem,
                                                                                              onCancel,
                                                                                            }) => {
  const [form] = Form.useForm();

  // Все сотрудники, отфильтрованные сотрудники
  const [allEmployee, setAllEmployee] = useState<TypeEmployee[]>();
  const [filteredEmployee, setFilteredEmployee] = useState<TypeEmployee[]>([]);

  // Изменить выбранного сотрудника
  const onChangeEmployee = useCallback((values: string, option: any): TypeEmployee => {
    const employee: TypeEmployee = {
      id: option.id,
    };
    form.setFieldsValue({employee: employee});
    return employee
  }, [form]);

  // Очистить поле сотрудника
  const onClearEmployee = useCallback((): void => {
    form.setFieldsValue({employee: undefined});
  }, [form]);

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
  const handleOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addItem(values);
        onSearchEmployee('');
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }, [form, addItem, onSearchEmployee]);

  // Функция закрытия модального окна
  const handleClose = useCallback(() => {
    form.resetFields();
    onCancel()
  }, [form, onCancel])

  useEffect(() => {
    getAllEmployee().then((allEmployee) => {
      setAllEmployee(allEmployee);
      setFilteredEmployee(allEmployee)
    });
  }, []);

  return (
    <Modal
      title={`Добавление сотрудника в табель учета рабочего времени`}
      open={isOpen}
      onCancel={handleClose}
      width={600}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{modifier: 'public'}}
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
              onChange={onChangeEmployee}
              onClear={onClearEmployee}
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
    </Modal>
  )
}