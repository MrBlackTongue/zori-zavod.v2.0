import React, {useState, useEffect, useCallback} from "react";
import {Button, DatePicker, Drawer, Form, Select, Space} from "antd";
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

  // Состояния для всех клиентов, выбранного клиента
  const [allClient, setAllClient] = useState<TypeClient[]>();
  const [selectedClient, setSelectedClient] = useState<TypeClient>();

  // Функция для изменения выбранного клиента
  const onChangeClient = (value: string, option: any): void => {
    const client: TypeClient = {
      id: option.id,
      title: value,
    };
    form.setFieldsValue({client: client});
    setSelectedClient(client)
  };

  // Функция для получения данных об отгрузке по id и обновления формы
  const handleGetShipmentById = useCallback(async (selectedItemId: number) => {
    const shipment = await getShipmentById(selectedItemId)
    form.setFieldsValue({
      date: dayjs(shipment?.date),
      client: shipment?.client?.id,
    });
    setSelectedClient(shipment?.client)
  }, [form]);

  // Функция для обработки нажатия кнопки "Сохранить"
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        if (typeof values.client === 'number') {
          values.client = selectedClient
        }
        updateItem(values);
        closeDrawer()
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };

  // Функция для обработки закрытия дравера
  const handleClose = (): void => {
    form.resetFields();
    if (selectedItemId) {
      handleGetShipmentById(selectedItemId).catch((error) => console.error(error));
    }
    closeDrawer()
  }

  // Функция для сброса выбранного значения клиента в форме
  const onClearClient = (): void => {
    form.setFieldsValue({client: undefined});
    setSelectedClient(undefined);
  }

  useEffect(() => {
    getAllClient().then((allClient) => {
      setAllClient(allClient);
    });
  }, []);

  useEffect(() => {
    if (selectedItemId) {
      handleGetShipmentById(selectedItemId).catch((error) => console.error(error));
    } else {
      setSelectedClient(undefined);
    }
  }, [selectedItemId, handleGetShipmentById]);

  return (
    <Drawer
      title="Редактирование отгрузки"
      width={600}
      open={isOpen}
      onClose={handleClose}
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
      >
        <Form.Item
          label="Дата"
          name="date"
          rules={[{required: true, message: 'выберите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            format='DD.MM.YYYY'
          />
        </Form.Item>
        <Form.Item
          label="Клиент"
          name="client"
          rules={[{required: true, message: 'выберите клиента'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
              value={selectedClient ? selectedClient.title : undefined}
              onChange={onChangeClient}
              onClear={onClearClient}
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