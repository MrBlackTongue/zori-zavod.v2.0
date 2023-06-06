import React from 'react';
import {Form, Input, InputNumber, Select, Tooltip} from "antd";
import {FormMeterTypeProps} from "../../../types";

export const FormMeterType: React.FC<FormMeterTypeProps> = ({
                                                              form,
                                                              allUnit,
                                                              onChangeUnit,
                                                              onClearUnit,
                                                              onSearchUnit
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
        label="Название"
        name="title"
        rules={[{required: true, message: 'введите название'}]}
      >
        <Input placeholder='Название'/>
      </Form.Item>
      <Form.Item
        label="Цена"
        name="cost"
        rules={[{required: true, message: "введите цену"}]}
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
        label="Единица измерения"
        name="unit"
        rules={[{required: true, message: 'выберите единицу измерения'}]}
      >
        <Select
          showSearch
          allowClear
          placeholder='Выберите единицу измерения'
          onChange={onChangeUnit}
          onClear={onClearUnit}
          filterOption={onSearchUnit}
        >
          {allUnit && allUnit.length > 0 ?
            allUnit.map(unit => (
              <Option key={unit.id} value={unit.id} label={unit.name}>
                <Tooltip placement="right" title={unit.name}>
                  {unit.name}
                </Tooltip>
              </Option>
            )) : null}
        </Select>
      </Form.Item>
    </Form>
  );
}