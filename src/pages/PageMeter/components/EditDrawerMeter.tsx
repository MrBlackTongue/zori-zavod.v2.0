import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Form, Input, InputNumber, Select, Space} from "antd";
import {EditDrawerProps, TypeMeter, TypeMeterType} from "../../../types";
import {getAllMeterType, getMeterById} from "../../../services";

const {Option} = Select;

export const EditDrawerMeter: React.FC<EditDrawerProps<TypeMeter>> = ({
                                                                        isOpen,
                                                                        closeDrawer,
                                                                        updateItem,
                                                                        selectedItemId,
                                                                      }) => {

  const [form] = Form.useForm();

  // Все типы счетчиков, выбранный счетчик
  const [allMeterType, setAllMeterType] = useState<TypeMeterType[]>();
  const [selectedMeterType, setSelectedMeterType] = useState<TypeMeterType>();

  // Изменить выбранный тип счетчика
  const onChangeMeterType = (value: any, option: any): void => {
    const meterType: TypeMeterType = {
      id: option.id,
      title: value,
    };
    form.setFieldsValue({
      meterTypeDto: meterType
    });
    setSelectedMeterType(meterType)
  };

  // Функция подтверждения редактирования
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
        closeDrawer();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
        return;
      });
  }

  // Функция для получения данных в дравер
  const handleGetMeter = useCallback((): void => {
    if (selectedItemId) {
      getMeterById(selectedItemId).then((data) => {
        form.setFieldsValue({
          ...data,
          meterTypeDto: data?.meterTypeDto
        })
        setSelectedMeterType(data?.meterTypeDto)
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    getAllMeterType().then((allMeterType) => {
      setAllMeterType(allMeterType);
    });
  }, []);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetMeter()
    } else {
      form.resetFields();
      setSelectedMeterType(undefined);
    }
  }, [isOpen, selectedItemId, handleGetMeter, form]);

  return (
    <Drawer
      title="Добавление счётчика"
      width={600}
      open={isOpen}
      onClose={closeDrawer}
      extra={
        <Space>
          <Button onClick={closeDrawer}>Отмена</Button>
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
          label="Тип счётчика"
          name="meterTypeDto"
        >
          <div>
            <Select
              value={selectedMeterType ? selectedMeterType?.title : undefined}
              onChange={onChangeMeterType}
            >
              {allMeterType && allMeterType.length > 0 ?
                allMeterType.map(meterType => (
                  <Option id={meterType.id} key={meterType.id} value={meterType.title}>
                    {meterType.title}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Описание"
          name="description"
          rules={[{required: true, message: 'Введите описание'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Серийный номер"
          name="serialNumber"
          rules={[{required: true, message: 'Введите серийный номер'}]}
        >
          <InputNumber style={{width: '100%'}}/>
        </Form.Item>
      </Form>
    </Drawer>
  );
}