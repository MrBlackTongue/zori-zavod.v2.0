import React, { useEffect, useRef, useState } from 'react';
import { RefSelectProps } from 'antd/lib/select';
import { Form, Input, InputRef, Select } from 'antd';
import { useFormSelect } from '../../../hooks';
import { EditableCellProps } from '../../../types';

export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  allEmployee,
  form,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const selectRef = useRef<RefSelectProps>(null);
  const inputRef = useRef<InputRef>(null);

  // Хук для управления полем employee
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'employee',
  );

  useEffect(() => {
    if (editing) {
      if (
        dataIndex === 'employee' &&
        selectRef.current &&
        'focus' in selectRef.current
      ) {
        selectRef.current.focus();
      } else if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [editing, dataIndex]);

  const isWorkHourObject = (value: {}): value is { hours: number } => {
    return value && typeof value === 'object' && 'hours' in value;
  };

  const toggleEdit = () => {
    setEditing(!editing);

    if (form) {
      if (dataIndex === 'employee') {
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
      } else {
        const value = record[dataIndex];
        if (isWorkHourObject(value)) {
          form.setFieldsValue({ [dataIndex]: value.hours });
        }
      }
    }
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();

      const updatedRecord = {
        ...record,
        [dataIndex]: values[dataIndex],
      };

      console.log('Новые часы:', values[dataIndex]);
      console.log('Дата:', dataIndex); // dataIndex у вас хранит дату
      console.log('ID сотрудника:', updatedRecord.employee.id);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const onBlurHandler = () => {
    const employeeInfo = record.employee.id;
    const hoursInfo = record[dataIndex];

    console.log('Id сотрудника:', employeeInfo);
    console.log('Дата:', dataIndex);
    console.log('Информация о ячейке:', hoursInfo);
  };

  let childNode = children;

  // Рендерит выпадающий список для выбора сотрудника
  const renderEmployeeSelect = () => (
    <Form.Item
      style={{ margin: 0 }}
      name={dataIndex}
      rules={[{ required: true, message: 'выберите сотрудника' }]}>
      <Select
        ref={selectRef}
        onBlur={save}
        showSearch
        allowClear
        onChange={onChangeSelect}
        onClear={onClearSelect}
        filterOption={onSearchSelect}>
        {allEmployee.map(data => (
          <Select.Option
            key={data.id}
            value={data.id}
            label={`${data.lastName}, ${data.firstName}`}>
            {`${data.lastName} ${data.firstName}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );

  // Рендерит поле ввода для редактирования данных ячейки
  const renderInput = () => (
    <Form.Item
      style={{ margin: 0 }}
      name={dataIndex}
      rules={[{ required: true, message: `Укажите ${title}` }]}>
      <Input ref={inputRef} onPressEnter={save} onBlur={onBlurHandler} />
    </Form.Item>
  );

  // Рендерит дефолтное отображение ячейки
  const renderDefault = () => (
    <div
      className="editable-cell-value-wrap"
      style={{ paddingRight: 24 }}
      onClick={toggleEdit}>
      {children}
    </div>
  );

  // Определяет, какой контент должен быть отрендерен в ячейке на основе ее состояния.
  const renderContent = () => {
    if (editable && editing) {
      return dataIndex === 'employee' ? renderEmployeeSelect() : renderInput();
    }
    return renderDefault();
  };

  return <td {...restProps}>{renderContent()}</td>;
};
