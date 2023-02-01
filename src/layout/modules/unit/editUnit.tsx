import {Button, Drawer, Form, Input, Space} from "antd";
import React, {useEffect, useState} from "react";
import {EditUnitProps, UnitType} from "../../../types/unitType";
import {getUnitById} from "../../../requests/unitsRequests";


export const EditUnit: React.FC<EditUnitProps> = ({
                                                            isOpen,
                                                            selectedUnitId,
                                                            closeDrawer,
                                                            updateUnit,
                                                          }) => {
  const [form] = Form.useForm();

  const [unit] = useState<UnitType | null>(null);

  useEffect(() => {
    if (selectedUnitId) {
      getUnitById(selectedUnitId).then((unit) => {
        form.setFieldsValue(unit);
      })
    }
  }, [selectedUnitId, getUnitById]);

  return (
    <Drawer
      title="Редактирование единицы измерения"
      width={600}
      open={isOpen}
      onClose={closeDrawer}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={closeDrawer}>Отмена</Button>
          <Button onClick={() => {
            closeDrawer()
            form
              .validateFields()
              .then((values) => {
                // form.resetFields()
                updateUnit(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          }} type="primary" form='change-unit' htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        id='change-unit'
        form={form}
        name="change-unit"
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[{required: true, message: 'Пожалуйста введите имя'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name='id'>
        </Form.Item>
      </Form>
    </Drawer>
  )
}