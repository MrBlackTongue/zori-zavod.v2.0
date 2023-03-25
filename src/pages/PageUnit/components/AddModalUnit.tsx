import React from "react";
import {AddModalProps, UnitType} from "../../../types/_index";
import {Form, Input, Modal} from "antd";

export const AddModalUnit: React.FC<AddModalProps<UnitType>> = ({
                                                          isOpen,
                                                          addItem,
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
            addItem(values);
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
          rules={[{required: true, message: 'введите имя'}]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  )
}