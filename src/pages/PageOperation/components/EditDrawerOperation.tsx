import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Form, Input, InputNumber, Select, Space} from "antd";
import {EditDrawerProps, TypeOperation, TypeUnit} from "../../../types";
import {getOperationById, getAllUnit} from "../../../services";
import {useUnit} from "../../../hooks"

const {Option} = Select;

export const EditDrawerOperation: React.FC<EditDrawerProps<TypeOperation>> = ({
                                                                                isOpen,
                                                                                selectedItemId,
                                                                                closeDrawer,
                                                                                updateItem,
                                                                              }) => {
  const [form] = Form.useForm();

  // Все единицы измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();

  const {onChangeUnit, onClearUnit} = useUnit(form);

  // Функция подтверждения редактирования
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields()
        updateItem(values);
        closeDrawer()
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      })
  }

  // Функция закрытия дравера
  const handleClose = (): void => {
    form.resetFields()
    closeDrawer()
  };

  // Функция для получения данных в дравер
  const handleGetOperation = useCallback((): void => {
    if (selectedItemId) {
      getOperationById(selectedItemId).then((operation) => {
        form.setFieldsValue({
          ...operation,
          unit: operation?.unit?.name,
        })
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetOperation();
    }
  }, [isOpen, selectedItemId, handleGetOperation]);

  useEffect(() => {
    getAllUnit().then((allUnit) => {
      setAllUnit(allUnit);
    });
  }, []);

  return (
    <Drawer
      title="Редактирование операции"
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
          label="Название операции"
          name="title"
          rules={[{required: true, message: 'введите название'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Единица измерения"
          name="unit"
        >
          <Select
            showSearch
            allowClear
            onChange={onChangeUnit}
            onClear={onClearUnit}
          >
            {allUnit && allUnit.length > 0 ?
              allUnit.map(unit => (
                <Option id={unit.id} key={unit.id} value={unit.name}>
                  {unit.name}
                </Option>
              )) : null}
          </Select>
        </Form.Item>
        <Form.Item
          label="Норма"
          name="rate"
          rules={[{
            type: 'number',
            message: 'напишите норму цифрами больше 1',
            warningOnly: true,
          }]}
        >
          <InputNumber style={{width: '100%'}}/>
        </Form.Item>
      </Form>
    </Drawer>
  )
}