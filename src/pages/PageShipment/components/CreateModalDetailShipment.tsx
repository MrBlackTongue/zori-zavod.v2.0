import React from 'react';
import {
  CreateModalProps,
  TypeShipmentProductMovementFormValue,
} from '../../../types';
import { Form, InputNumber, message, Modal, Select, Tooltip } from 'antd';
import { useFetchAllData, useFormHandler, useFormSelect } from '../../../hooks';
import { numberFormatter, numberParser } from '../../../utils';

export const CreateModalDetailShipment: React.FC<
  CreateModalProps<TypeShipmentProductMovementFormValue>
> = ({ isOpen, createItem, onCancel }) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  // Хук для получения данных
  const { allStock } = useFetchAllData({ depsStock: isOpen });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    createItem,
    onCancel,
  );

  // Хук для управления полем stock
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'stock',
  );

  // Проверка ввода количества перед отправкой
  const preSubmitValidation = (): boolean => {
    const enteredAmount = form.getFieldValue('amount');
    const selectedStockId = form.getFieldValue('stock');
    const selectedStock = allStock.find(stock => stock.id === selectedStockId);

    if (selectedStock && selectedStock.amount === 0) {
      void message.warning('Выбранного товара не осталось на складе');
      return false;
    }

    if (
      enteredAmount &&
      selectedStock &&
      selectedStock.amount !== undefined &&
      enteredAmount > selectedStock.amount
    ) {
      void message.warning(
        'Введенное количество превышает количество товара на складе',
      );
      return false;
    }
    return true;
  };

  // Обработчик подтверждения добавления нового товара
  const handleOk = (): void => {
    if (preSubmitValidation()) {
      handleSubmit();
    }
  };

  return (
    <Modal
      title={`Добавление отгруженного товара`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={600}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleReset}>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: 30 }}>
        <Form.Item
          label="Товар на складе"
          name="stock"
          rules={[{ required: true, message: 'выберите товар' }]}>
          <Select
            showSearch
            allowClear
            placeholder="Выберите товар"
            onChange={onChangeSelect}
            onClear={onClearSelect}
            filterOption={onSearchSelect}>
            {allStock && allStock.length > 0
              ? allStock.map(stock => (
                  <Option
                    key={stock.id}
                    value={stock.id}
                    label={`${stock.product?.title}, ${stock.id}`}>
                    <Tooltip
                      placement="right"
                      title={`${stock.product?.title}, ID: ${
                        stock.id
                      }, ${stock?.amount?.toLocaleString('ru-RU', {
                        maximumFractionDigits: 2,
                      })}`}>
                      {`${stock.product?.title}, ID: ${
                        stock.id
                      }, ${stock?.amount?.toLocaleString('ru-RU', {
                        maximumFractionDigits: 2,
                      })}`}
                    </Tooltip>
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item
          label="Количество"
          name="amount"
          rules={[{ required: true, message: 'введите количество' }]}>
          <InputNumber
            placeholder="1"
            style={{ width: '100%' }}
            min={1}
            formatter={numberFormatter}
            parser={numberParser}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
