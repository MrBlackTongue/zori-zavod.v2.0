import React, {useState, useEffect} from "react";
import {DatePicker, Form, Input, InputNumber, Modal, Select, TimePicker} from "antd";
import {AddModalProps, TypeMeterRecord, TypeUnit} from "../../../types";
import {formatTimeStr} from "antd/es/statistic/utils";
// import {getAllMeter} from "../../../services";

const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY HH:mm';

export const AddModalMeterRecord: React.FC<AddModalProps<TypeMeterRecord>> = ({
                                                                            isOpen,
                                                                            addItem,
                                                                            onCancel,
                                                                          }) => {
  const [form] = Form.useForm();

  // Все единицы измерения
  const [allMeter, setAllMeter] = useState<TypeUnit[]>();

  // Изменить выбранный счётчик
  // const onChangeMeter = (value: string, option: any): void => {
  //   const meter: TypeMeter = {
  //     id: option.id,
  //     name: value,
  //   };
  //   form.setFieldsValue({unit: unit});
  // };

  // Функция подтверждения добавления
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addItem(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
        return;
      });
  };

  // Функция для сброса формы при закрытии модального окна
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  // useEffect(() => {
  //   getAllMeter().then((allMeter) => {
  //     setAllMeter(allMeter);
  //   });
  // }, []);

  return (
    <Modal
      title={`Добавление новой записи счетчика`}
      open={isOpen}
      onCancel={handleCancel}
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
          label="Показания"
          name="value"
          rules={[{required: true, message: 'введите показания'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Дата"
          name="date"
          rules={[{required: true, message: "выберите дату"}]}
        >
          <DatePicker
            style={{width: '100%'}}
            format={dateFormatUser}
            showTime={{ format: 'HH:mm' }}
          />
        </Form.Item>
        <Form.Item
          label="Счётчик"
          name="meter"
          rules={[{required: true, message: 'выберите единицу измерения'}]}
        >
          <div>
            <Select
              // onChange={onChangeMeter}
            >
              {allMeter && allMeter.length > 0 ?
                allMeter.map(meter => (
                  <Option id={meter.id} key={meter.id} value={meter.name}>
                    {meter.name}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}