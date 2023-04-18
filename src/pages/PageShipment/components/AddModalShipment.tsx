import React, {useEffect, useState} from "react";
import {AddModalProps, TypeShipment, TypeClient} from "../../../types";
import {Form, Modal, DatePicker, Select} from "antd";
import {getAllClient} from "../../../services";

const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY';

export const AddModalShipment: React.FC<AddModalProps<TypeShipment>> = ({
                                                                      isOpen,
                                                                      addItem,
                                                                      onCancel,
                                                                    }) => {
  const [form] = Form.useForm();

  // Все товары, выбранный товар
  const [allClient, setAllClient] = useState<TypeClient[]>();
  const [selectedClient, setSelectedClient] = useState<TypeClient>();

  // Изменить выбранный товар
  const onChangeClient = (values: string, option: any): TypeClient => {
    const client: TypeClient = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      client: client
    });
    setSelectedClient(client)
    return client
  };

  useEffect(() => {
    getAllClient().then((clients) => {
      setAllClient(clients);
    });
  }, []);

  return (
    <Modal
      title={`Добавление новой отгрузки`}
      open={isOpen}
      onCancel={() => {
        onCancel()
        setSelectedClient(undefined)
      }}
      width={500}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log(values)
            form.resetFields();
            setSelectedClient(undefined)
            addItem(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        initialValues={{
          modifier: 'public'
        }}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Дата"
          name="date"
          rules={[{type: 'object' as const, required: true, message: 'выберите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            format={dateFormatUser}
          />
        </Form.Item>
        <Form.Item
          label="Клиент"
          name="client"
          rules={[{required: true, message: 'выберите клиента'}]}
        >
          <div>
            <Select
              value={selectedClient ? selectedClient.title : undefined}
              onChange={onChangeClient}
            >
              {allClient && allClient.length > 0 ?
                allClient.map(client => (
                  <Option id={client.id} key={client.id} value={client.title}>
                    {client.title}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}