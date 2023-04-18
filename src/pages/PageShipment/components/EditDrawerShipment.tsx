import {Button, DatePicker, Drawer, Form, Select, Space} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {EditDrawerProps, TypeShipment, TypeClient} from "../../../types";
import {getShipmentById, getAllClient} from "../../../services";
import dayjs from 'dayjs';

const {Option} = Select;

export const EditDrawerShipment: React.FC<EditDrawerProps<TypeShipment>> = ({
                                                                          isOpen,
                                                                          selectedItemId,
                                                                          closeDrawer,
                                                                          updateItem,
                                                                        }) => {
  const [form] = Form.useForm();

  // Все товары, выбранный товар, товар, дата
  const [allClient, setAllClient] = useState<TypeClient[]>();
  const [selectedClient, setSelectedClient] = useState<TypeClient>();
  const [client, setClient] = useState<TypeClient>();
  const [date, setDate] = useState<any>();

  // Изменить выбранный товар
  const onChangeClient = (values: string, option: any): TypeClient => {
    const client: TypeClient = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      client: client,
    });
    setSelectedClient(client)
    return client
  };

  // Функция для получения данных об отгрузке по id и обновления формы
  const handleGetShipmentById = useCallback(() => {
    if (selectedItemId) {
      getShipmentById(selectedItemId).then((shipment) => {
        form.setFieldsValue({
          date: dayjs(shipment?.date),
          client: shipment?.client?.id,
        });
        setSelectedClient(shipment?.client)
        setClient(shipment?.client)
        setDate(dayjs(shipment?.date));
      })
    }
  }, [selectedItemId]);

  const handleOk = () => {
    closeDrawer()
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  const handleClose = () => {
    handleGetShipmentById();
    closeDrawer()
    setSelectedClient(client)
  }

  useEffect(() => {
    getAllClient().then((clients) => {
      setAllClient(clients);
    });
  }, []);

  useEffect(() => {
    handleGetShipmentById();
  }, [selectedItemId, handleGetShipmentById]);

  return (
    <Drawer
      title="Редактирование отгрузки"
      width={600}
      open={isOpen}
      onClose={handleClose}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={handleClose}>Отмена</Button>
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
        initialValues={{date: date}}
      >
        <Form.Item
          label="Дата"
          name="date"
          rules={[{type: 'object' as const, required: true, message: 'выберите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            format='DD.MM.YYYY'
            onChange={(value) => {
              setDate(value);
            }}
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
    </Drawer>
  )
}