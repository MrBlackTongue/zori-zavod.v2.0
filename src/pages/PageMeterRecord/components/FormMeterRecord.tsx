import React from 'react';
import {DatePicker, Form, InputNumber, Select, Tooltip} from "antd";
import {FormMeterRecordProps} from "../../../types";

export const FormMeterRecord: React.FC<FormMeterRecordProps> = ({
                                                                  form,
                                                                  allMeter,
                                                                  onChangeMeter,
                                                                  onClearMeter,
                                                                  onSearchMeter,
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
        label="Счетчик"
        name="meterDto"
        rules={[{required: true, message: 'выберите единицу измерения'}]}
      >
        <Select
          showSearch
          allowClear
          placeholder='Выберите счетчик'
          onChange={onChangeMeter}
          onClear={onClearMeter}
          filterOption={onSearchMeter}
        >
          {allMeter && allMeter.length > 0 ?
            allMeter.map(meter => (
              <Option key={meter.id} value={meter.id} label={meter.description}>
                <Tooltip placement="right" title={meter.description}>
                  {meter.description}
                </Tooltip>
              </Option>
            )) : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Показания"
        name="value"
        rules={[{required: true, message: 'введите показания'}]}
      >
        <InputNumber
          style={{width: "100%"}}
          placeholder='100'
          min={0.01}
          formatter={(value) => `${value}`.replace('.', ',')}
          parser={(displayValue: string | undefined): number => {
            if (displayValue === undefined) return 0;
            return parseFloat(displayValue.replace(',', '.'));
          }}
        />
      </Form.Item>
      <Form.Item
        label="Дата"
        name="date"
        rules={[{required: true, message: "выберите дату"}]}
      >
        <DatePicker
          style={{width: '100%'}}
          format={'DD.MM.YYYY HH:mm:ss'}
          showTime
        />
      </Form.Item>

    </Form>
  );
}