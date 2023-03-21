import {Button, Drawer, Form, Input, Space} from "antd";
import React, {useEffect} from "react";
import {EditItemProps, UnitType} from "../../types";
import {getUnitById} from "../../services";

export const EditDrawerUnit: React.FC<EditItemProps<UnitType>> = ({
                                                            isOpen,
                                                            selectedItemId,
                                                            closeDrawer,
                                                            updateItem,
                                                          }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedItemId) {
      getUnitById(selectedItemId).then((unit) => {
        form.setFieldsValue(unit);
      })
    }
  }, [selectedItemId, getUnitById]);

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
                updateItem(values);
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
          rules={[{required: true, message: 'введите имя'}]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </Drawer>
  )
}