import React, {useState, useEffect} from "react";
import {AddModalProps, TypeOperation, TypeUnit} from "../../../types";
import {Form, Input, InputNumber, Modal, Select} from "antd";
import {getAllUnit} from "../../../services";

const {Option} = Select;

export const AddModalOperation: React.FC<AddModalProps<TypeOperation>> = ({
                                                                            isOpen,
                                                                            addItem,
                                                                            onCancel,
                                                                          }) => {
  const [form] = Form.useForm();

  // Все единицы измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();

  // Изменить выбранную единицу измерения
  const onChangeUnit = (value: string, option: any): void => {
    const unit: TypeUnit = {
      id: option.id,
      name: value,
    };
    form.setFieldsValue({unit: unit});
  };

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
    onCancel()
  };

  useEffect(() => {
    getAllUnit().then((units) => {
      setAllUnit(units);
    });
  }, []);

  return (
    <Modal
      title={`Добавление новой операции`}
      open={isOpen}
      onCancel={handleClose}
      width={700}
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
          <div>
            <Select
              onChange={onChangeUnit}
            >
              {allUnit && allUnit.length > 0 ?
                allUnit.map(unit => (
                  <Option id={unit.id} key={unit.id} value={unit.name}>
                    {unit.name}
                  </Option>
                )) : null}
            </Select>
          </div>
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