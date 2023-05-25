import React, {useState, useEffect, useCallback} from "react";
import {AddModalProps, TypeProductionProductMovement, TypeStock} from "../../../types";
import {Form, InputNumber, message, Modal, Select} from "antd";
import {getAllStock} from "../../../services";

const {Option} = Select;

export const AddModalProductionProductMovement:
  React.FC<AddModalProps<TypeProductionProductMovement>> = ({
                                                              isOpen,
                                                              addItem,
                                                              onCancel,
                                                            }) => {
  const [form] = Form.useForm();

  // Состояния для всех товаров на складе, выбранного товара и отфильтрованные товары
  const [allStock, setAllStock] = useState<TypeStock[]>();
  const [selectedStock, setSelectedStock] = useState<TypeStock>();
  const [filteredStock, setFilteredStock] = useState<TypeStock[]>([]);

  // Функция изменения выбранного товара на складе
  const onChangeStock = (value: string): TypeStock | undefined => {
    const selectedStock = allStock?.find(stock => stock.id === parseInt(value));
    form.setFieldsValue({stock: selectedStock});
    setSelectedStock(selectedStock)
    onSearchStock('')
    return selectedStock
  };

  // Поиск по товарам на складе
  const onSearchStock = (searchText: string) => {
    if (searchText === '') {
      setFilteredStock(allStock || []);
    } else {
      const searchLowerCase = searchText.toLowerCase();
      const filtered = allStock?.filter((stock) => {

        const titleMatch = stock?.product && stock.product.title
          ? stock.product.title.toLowerCase().includes(searchLowerCase)
          : false;

        const idMatch = stock.id?.toString().includes(searchText);

        return titleMatch || idMatch;
      });
      setFilteredStock(prevState => filtered || prevState);
    }
  };

  // Функция подтверждения добавления
  const handleOk = useCallback(() => {
    const enteredAmount = form.getFieldValue("amount");
    const enteredIncome = form.getFieldValue('income')
    if (selectedStock?.amount === 0 && !enteredIncome) {
      message.warning("Выбранного товара не осталось на складе").then(() => {
      })
      return;
    }
    if (enteredAmount && selectedStock?.amount && enteredAmount > selectedStock.amount && !enteredIncome) {
      message.warning("Введенное количество превышает количество товара на складе").then(() => {
      })
      return;
    }
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addItem(values);
        setSelectedStock(undefined)
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  }, [form, addItem]);

  // Функция закрытия модального окна
  const handleClose = useCallback(() => {
    form.resetFields();
    onCancel()
    setSelectedStock(undefined)
  }, [form, onCancel])

  useEffect(() => {
    getAllStock().then((allStock) => {
      setAllStock(allStock);
      setFilteredStock(allStock);
    });
  }, [onCancel]);

  return (
    <Modal
      title={`Добавление движения товара на производстве`}
      open={isOpen}
      onCancel={handleClose}
      width={600}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{income: false, modifier: 'public'}}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Товар на складе"
          name="stock"
          rules={[{required: true, message: 'выберите товар'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
              filterOption={false}
              value={
                selectedStock
                  ? `${selectedStock.product?.title}, ID: ${selectedStock.id}, ${selectedStock?.amount}`
                  : undefined}
              onChange={onChangeStock}
              onSearch={onSearchStock}
            >
              {filteredStock && filteredStock.length > 0
                ? filteredStock.map((stock) => (
                  <Option id={stock.id} key={stock.id} value={stock.id}>
                    {`${stock.product?.title}, ID: ${stock.id}, ${stock?.amount}`}
                  </Option>
                ))
                : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Количество"
          name="amount"
          rules={[{required: true, message: 'введите количество'}]}
        >
          <InputNumber style={{width: "100%"}}/>
        </Form.Item>
        <Form.Item
          label="Тип движения"
          name="income"
        >
          <div>
            <Select
              defaultValue={false}
              onChange={value => form.setFieldsValue({income: value})}
            >
              <Option id={true} value={true}>{'Приход'}</Option>
              <Option id={false} value={false}>{'Расход'}</Option>
            </Select>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}