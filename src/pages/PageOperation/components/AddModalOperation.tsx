import React, {useState, useEffect} from "react";
import {AddModalProps, TypeOperation, TypeUnit} from "../../../types";
import {Form, Input, InputNumber, Modal, Select} from "antd";
import {getAllUnit} from "../../../services";
import {useUnit} from "../../../hooks"

const {Option} = Select;

export const AddModalOperation: React.FC<AddModalProps<TypeOperation>> = ({
                                                                            isOpen,
                                                                            addItem,
                                                                            onCancel,
                                                                          }) => {
  const [form] = Form.useForm();

  // Все единицы измерения, выбраная единица измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();

  const {onChangeUnit, onClearUnit} = useUnit(form);

  // Изменить выбранную единицу измерения
  // const onChangeUnit = (value: string, option: any): void => {
  //   const unit: TypeUnit = {
  //     id: option.id,
  //     name: value,
  //   };
  //   form.setFieldsValue({unit: unit});
  // };

  // Очистить поле единица измерения
  // const onClearUnit = (): void => {
  //   form.setFieldsValue({unit: undefined})
  // }

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