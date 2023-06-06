import React from 'react';
import {Form, Input, InputNumber, Select, Tooltip} from "antd";
import {FormMeterProps} from "../../../types";

export const FormMeter: React.FC<FormMeterProps> = ({
                                                      form,
                                                      allMeterType,
                                                      onChangeMeterType,
                                                      onClearMeterType,
                                                      onSearchMeterType
                                                    }) => {
  const {Option} = Select;

  return (
    <Form
      form={form}
      labelCol={{span: 6}}
      wrapperCol={{span: 16}}
      style={{marginTop: 30}}
    >
      <Form.Item
        label="Тип счётчика"
        name="meterTypeDto"
        rules={[{required: true, message: 'выберите счётчик'}]}
      >
        <Select
          showSearch
          allowClear
          placeholder='Выберите тип счетчика'
          onChange={onChangeMeterType}
          onClear={onClearMeterType}
          filterOption={onSearchMeterType}
        >
          {allMeterType && allMeterType.length > 0 ?
            allMeterType.map(meterType => (
              <Option key={meterType.id} value={meterType.id} label={meterType.title}>
                <Tooltip placement="right" title={meterType.title}>
                  {meterType.title}
                </Tooltip>
              </Option>
            )) : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Серийный номер"
        name="serialNumber"
        rules={[{required: true, message: "введите серийный номер"}]}
      >
        <InputNumber placeholder='Серийный номер счетчика' style={{width: "100%"}} min={0}/>
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={[{required: true, message: "введите описание"}]}
      >
        <Input.TextArea/>
      </Form.Item>
    </Form>
  );
}