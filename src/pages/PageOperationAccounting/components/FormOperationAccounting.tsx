import React from 'react';
import {DatePicker, Form, InputNumber, Select} from "antd";
import {FormOperationAccountingProps} from "../../../types";
import dayjs from "dayjs";

const {Option} = Select;

export const FormOperationAccounting: React.FC<FormOperationAccountingProps> = ({
                                                                                  form,
                                                                                  allOperation,
                                                                                  onChangeOperation,
                                                                                  onClearOperation,
                                                                                  onSearchOperation,
                                                                                  allOutput,
                                                                                  onChangeOutput,
                                                                                  onClearOutput,
                                                                                  onSearchOutput,
                                                                                  allProductionType,
                                                                                  onChangeProductionType,
                                                                                  onClearProductionType,
                                                                                  onSearchProductionType,
                                                                                }) => {
  return (
    <Form
      form={form}
      labelCol={{span: 6}}
      wrapperCol={{span: 16}}
      style={{marginTop: 30}}
    >
      <Form.Item
        label="Операция"
        name="operation"
        rules={[{required: true, message: 'выберите операцию'}]}
      >
        <Select
          showSearch
          allowClear
          placeholder='Выберите операцию'
          onChange={onChangeOperation}
          onClear={onClearOperation}
          filterOption={onSearchOperation}
        >
          {allOperation && allOperation.length > 0 ?
            allOperation.map(operation => (
              <Option key={operation.id} value={operation.id} label={operation.title}>
                {operation.title}
              </Option>
            )) : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Выпуск продукции"
        name="output"
      >
        <Select
          showSearch
          allowClear
          placeholder='Выберите выпуск продукции'
          onChange={onChangeOutput}
          onClear={onClearOutput}
          filterOption={onSearchOutput}
        >
          {allOutput && allOutput.length > 0
            ? allOutput.map((output) => (
              <Option
                key={output.id}
                value={output.id}
                label={`${output?.date}, ${output?.product?.title}, ${output.id}`}
              >
                {`${dayjs(output?.date).format('DD.MM.')}, ${output?.product?.title}, ID: ${output.id}`}
              </Option>
            ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Факт"
        name="fact"
      >
        <InputNumber style={{width: "100%"}} min={0}/>
      </Form.Item>
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
        label="Тип производства"
        name="productionType"
        rules={[{required: true, message: 'выберите тип'}]}
      >
        <Select
          showSearch
          allowClear
          placeholder='Выберите тип производства'
          onChange={onChangeProductionType}
          onClear={onClearProductionType}
          filterOption={onSearchProductionType}
        >
          {allProductionType && allProductionType.length > 0 ?
            allProductionType.map(productionType => (
              <Option key={productionType.id} value={productionType.id} label={productionType.title}>
                {productionType.title}
              </Option>
            )) : null}
        </Select>
      </Form.Item>
    </Form>
  );
}