import React, {useState, useEffect, useCallback} from "react";
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

  // Состояния для всех клиентов и выбранного клиента
  const [allClient, setAllClient] = useState<TypeClient[]>();
  const [selectedClient, setSelectedClient] = useState<TypeClient>();

  // Функция для изменения выбранного клиента
  const onChangeClient = useCallback((value: string, option: any): TypeClient => {
    const client: TypeClient = {
      id: option.id,
      title: value,
    };
    form.setFieldsValue({client: client});
    setSelectedClient(client)
    return client
  }, [form]);

  // Функция для очистки поля клиента
  const onClearClient = useCallback((): void => {
    form.setFieldsValue({operation: undefined});
    setSelectedClient(undefined);
  }, [form]);

  // Функция подтверждения добавления
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedClient(undefined)
        addItem(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }

  // Функция закрытия модального окна
  const handleClose = () => {
    form.resetFields()
    onCancel()
    setSelectedClient(undefined)
  }

  useEffect(() => {
    getAllClient().then((allClient) => {
      setAllClient(allClient);
    });
  }, []);

  return (
    <Modal
      title={`Добавление новой отгрузки`}
      open={isOpen}
      onCancel={handleClose}
      width={500}
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
    </Modal>
  )
}