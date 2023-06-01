import React, {useState, useEffect} from "react";
import {AddModalProps, TypeOperationFormValue, TypeUnit} from "../../../types";
import {Form, Input, InputNumber, Modal, Select} from "antd";
import {getAllUnit} from "../../../services";
import {useFormField} from "../../../hooks"

const {Option} = Select;

export const AddModalOperation: React.FC<AddModalProps<TypeOperationFormValue>> = ({
                                                                                     isOpen,
                                                                                     addItem,
                                                                                     onCancel,
                                                                                   }) => {
  const [form] = Form.useForm();

  // Все единицы измерения, выбраная единица измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();

  // Хук для управления полем unit
  const {
    onChangeField: onChangeUnit,
    onClearField: onClearUnit,
    onSearchField: onSearchUnit
  } = useFormField(form, 'unit');

  // Функция подтверждения добавления
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addItem(values);
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  }

  // Функция закрытия модального окна
  const handleClose = (): void => {
    form.resetFields();
    onCancel()
  };

  useEffect(() => {
    getAllUnit().then((allUnit) => {
      setAllUnit(allUnit);
    });
  }, []);

  return (
    <Modal
      title={`Добавление новой операции`}
      width={700}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleClose}
      okText={'Сохранить'}
      cancelText={'Отмена'}
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
    </Modal>
  )
}