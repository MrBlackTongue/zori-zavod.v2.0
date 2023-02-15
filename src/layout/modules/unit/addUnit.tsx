import React from "react";
import {AddUnitProps} from "../../../types/unitType";
import {Form, Input, Modal} from "antd";

export const AddUnit: React.FC<AddUnitProps> = ({
                                                          isOpen,
                                                          addUnit,
                                                          onCancel,
                                                        }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={`Добавление новой единицы измерения`}
      open={isOpen}
      onCancel={onCancel}
      width={500}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            addUnit(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        name="add-new-unit"
        initialValues={{
          modifier: 'public'
        }}
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
      </Form>
    </Modal>
  )
}