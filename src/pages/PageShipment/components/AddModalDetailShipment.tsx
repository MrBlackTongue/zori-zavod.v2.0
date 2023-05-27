import React, {useState, useEffect} from "react";
import {AddModalProps, TypeStock, TypeShipmentProductMovement} from "../../../types";
import {Form, InputNumber, message, Modal, Select} from "antd";
import {getAllStock} from "../../../services";

const {Option} = Select;


export const AddModalDetailShipment: React.FC<AddModalProps<TypeShipmentProductMovement>> = ({
                                                                                               isOpen,
                                                                                               addItem,
                                                                                               onCancel,
                                                                                             }) => {
  const [form] = Form.useForm();

  // Состояния для всех товаров на складе и выбранного товара, отфильтрованные товары
  const [allStock, setAllStock] = useState<TypeStock[]>();
  const [selectedStock, setSelectedStock] = useState<TypeStock>();
  const [filteredStock, setFilteredStock] = useState<TypeStock[]>([]);

  // Функция изменения выбранного товара на складе
  const onChangeStock = (value: string): void => {
    const selectedStock = allStock?.find(stock => stock.id === parseInt(value));
    form.setFieldsValue({stock: selectedStock});
    setSelectedStock(selectedStock)
    onSearchStock('')
  };

  // Поиск по товарам на складе
  const onSearchStock = (searchText: string): void => {
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

  // Функция подтверждения добавления нового товара
  const handleOk = () => {
    const enteredAmount = form.getFieldValue("amount");
    if (selectedStock?.amount === 0) {
      message.warning("Выбранного товара не осталось на складе");
      return;
    }
    if (enteredAmount && selectedStock?.amount && enteredAmount > selectedStock.amount) {
      message.warning("Введенное количество превышает количество товара на складе");
      return;
    }
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedStock(undefined)
        addItem(values);
        onSearchStock('');
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };

  // Функция закрытия модального окна
  const handleClose = () => {
    form.resetFields()
    onCancel()
    setSelectedStock(undefined)
  }

  // Получение списка всех товаров на складе
  useEffect(() => {
    getAllStock().then((allStock) => {
      setAllStock(allStock);
      setFilteredStock(allStock);
    });
  }, [onCancel]);

  return (
    <Modal
      title={`Добавление отгруженного товара`}
      open={isOpen}
      onCancel={handleClose}
      width={600}
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
      </Form>
    </Modal>
  )
}