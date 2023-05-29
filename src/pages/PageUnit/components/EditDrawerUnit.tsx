import React, {useCallback, useEffect} from "react";
import {Button, Drawer, Form, Input, Space} from "antd";
import {EditDrawerProps, TypeUnit} from "../../../types";
import {getUnitById} from "../../../services";

export const EditDrawerUnit: React.FC<EditDrawerProps<TypeUnit>> = ({
                                                                      isOpen,
                                                                      selectedItemId,
                                                                      closeDrawer,
                                                                      updateItem,
                                                                    }) => {
  const [form] = Form.useForm();

  // Функция подтверждения редактирования
  const handleOk = (): void => {
    closeDrawer()
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      })
  }

  const handleGetUnit = useCallback((): void => {
    if (selectedItemId) {
      getUnitById(selectedItemId).then((unit) => {
        form.setFieldsValue(unit);
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    handleGetUnit()
  }, [selectedItemId, handleGetUnit, form]);

  return (
    <Drawer
      title="Редактирование единицы измерения"
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