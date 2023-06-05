import React from 'react';
import {DatePicker, Form, Select, Tooltip} from "antd";
import {FormShipmentProps} from "../../../types";

const {Option} = Select;

export const FormShipment: React.FC<FormShipmentProps> = ({
                                                            form,
                                                            allClient,
                                                            onChangeClient,
                                                            onClearClient,
                                                            onSearchClient,
                                                          }) => {
  return (
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
          format={'DD.MM.YYYY'}
        />
      </Form.Item>
      <Form.Item
        label="Клиент"
        name="client"
        rules={[{required: true, message: 'выберите клиента'}]}
      >
        <Select
          showSearch
          allowClear
          placeholder='Выберите клиента'
          onChange={onChangeClient}
          onClear={onClearClient}
          filterOption={onSearchClient}
        >
          {allClient && allClient.length > 0 ?
            allClient.map(client => (
              <Option key={client.id} value={client.id} label={client.title}>
                <Tooltip placement="right" title={client.title}>
                  {client.title}
                </Tooltip>
              </Option>
            )) : null}
        </Select>
      </Form.Item>
    </Form>
  );
}