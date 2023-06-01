import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Form, Input, InputNumber, Select, Space} from "antd";
import {EditDrawerProps, TypeUnit, TypeOperationFormValue} from "../../../types";
import {getOperationById, getAllUnit} from "../../../services";
import {useFormField} from "../../../hooks"

const {Option} = Select;

export const EditDrawerOperation: React.FC<EditDrawerProps<TypeOperationFormValue>> = ({
                                                                                         isOpen,
                                                                                         selectedItemId,
                                                                                         onCancel,
                                                                                         updateItem,
                                                                                       }) => {
  const [form] = Form.useForm();

  // Все единицы измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();

  // Хук для управления полем unit
  const {
    onChangeField: onChangeUnit,
    onClearField: onClearUnit,
    onSearchField: onSearchUnit
  } = useFormField(form, 'unit');

  // Функция подтверждения редактирования
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields()
        updateItem(values);
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      })
  }

  // Функция закрытия дравера
  const handleClose = (): void => {
    form.resetFields()
    onCancel()
  };

  // Функция для получения данных в дравер
  const handleGetOperation = useCallback((): void => {
    if (selectedItemId) {
      getOperationById(selectedItemId).then((operation) => {
        form.setFieldsValue({
          ...operation,
          unit: operation?.unit?.id,
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
            filterOption={onSearchUnit}
          >
            {allUnit && allUnit.length > 0 ?
              allUnit.map(unit => (
                <Option key={unit.id} value={unit.id} label={unit.name}>
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