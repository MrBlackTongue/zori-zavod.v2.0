import React, {useState, useEffect} from "react";
import {AddModalProps, TypePurchase, TypeAcceptance, TypeStock} from "../../../types";
import {DatePicker, Form, InputNumber, Modal, Select, message} from "antd";
import {getAllStock, getAllPurchase} from "../../../services";
import dayjs from "dayjs";

const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY';

export const AddModalAcceptance: React.FC<AddModalProps<TypeAcceptance>> = ({
                                                                              isOpen,
                                                                              addItem,
                                                                              onCancel,
                                                                            }) => {
  const [form] = Form.useForm();

  // Товар со склада, выбраный товар со склада, поиск по товару на складе
  const [allStock, setAllStock] = useState<TypeStock[]>();
  const [selectedStock, setSelectedStock] = useState<TypeStock>();
  const [filteredStock, setFilteredStock] = useState<TypeStock[]>([]);

  // Все закупки, выбранная закупка, поиск по закупкам
  const [allPurchase, setAllPurchase] = useState<TypePurchase[]>();
  const [selectedPurchase, setSelectedPurchase] = useState<TypePurchase>();
  const [filteredPurchase, setFilteredPurchase] = useState<TypePurchase[]>([]);

  // Изменить выбранный товар на складе
  const onChangeStock = (value: number): void => {
    const stock = allStock?.find((stock) => stock.id === value);
    setSelectedStock(stock);
    form.setFieldsValue({stock: stock});
  };

  // Изменить выбранную закупку
  const onChangePurchase = (value: number): void => {
    const purchase = allPurchase?.find((purchase) => purchase.id === value);
    setSelectedPurchase(purchase);
    form.setFieldsValue({purchase: purchase});
  };

  // Функция фильтрации товара на складе
  const onSearchStock = (searchText: string): void => {
    if (searchText === '') {
      setFilteredStock(allStock || []);
    } else {
      const filtered = allStock?.filter((stock) => {
        const matchesTitle = stock && stock.product && stock.product.title
          ? stock.product.title.toLowerCase().includes(searchText.toLowerCase())
          : false;

        const matchesId = stock.id ? stock.id.toString().includes(searchText) : false;

        return matchesTitle || matchesId;
      });
      setFilteredStock(filtered || []);
    }
  };

  // Функция фильтрации закупок
  const onSearchPurchase = (searchText: string): void => {
    if (searchText === '') {
      setFilteredPurchase(allPurchase || []);
    } else {
      const filtered = allPurchase?.filter((purchase) => {
        const matchesTitle = purchase.product && purchase.product.title
          ? purchase.product.title.toLowerCase().includes(searchText.toLowerCase())
          : false;

        const matchesId = purchase.id ? purchase.id.toString().includes(searchText) : false;

        const purchaseDate = purchase.date ? dayjs(purchase.date).format('DD.MM.YYYY') : '';
        const matchesDate = purchaseDate.toLowerCase().includes(searchText.toLowerCase());

        return matchesTitle || matchesId || matchesDate;
      });
      setFilteredPurchase(filtered || []);
    }
  };

  // Функция подтверждения добавления
  const handleOk = (): void => {
    if (
      selectedPurchase &&
      selectedStock &&
      selectedPurchase?.product?.id !== selectedStock?.product?.id
    ) {
      message.warning("Товар в закупке и на складе отличается");
      return;
    }
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedStock(undefined);
        setSelectedPurchase(undefined);
        addItem(values);
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };

  // Функция закрытия модального окна
  const handleClose = (): void => {
    form.resetFields();
    onCancel()
    setSelectedStock(undefined)
    setSelectedPurchase(undefined)
  }

  useEffect(() => {
    getAllStock().then((stock) => {
      setAllStock(stock);
      setFilteredStock(stock);
    });
  }, []);

  useEffect(() => {
    getAllPurchase().then((purchase) => {
      setAllPurchase(purchase);
      setFilteredPurchase(purchase);
    });
  }, []);

  return (
    <Modal
      title={`Добавление новой приемки`}
      open={isOpen}
      onCancel={handleClose}
      width={600}
      okText={"Сохранить"}
      cancelText={"Отмена"}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{modifier: "public"}}
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
              onChange={onChangeStock}
              onSearch={onSearchStock}
            >
              {filteredStock && filteredStock.length > 0
                ? filteredStock.map((stock) => (
                  <Option key={stock.id} value={stock?.id}>
                    {`${stock.product?.title}, ID: ${stock.id}, ${stock?.amount}`}
                  </Option>
                ))
                : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Закупка"
          name="purchase"
          rules={[{required: true, message: 'выберите закупку'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
              filterOption={false}
              onChange={onChangePurchase}
              onSearch={onSearchPurchase}
            >
              {filteredPurchase && filteredPurchase.length > 0
                ? filteredPurchase.map((purchase) => (
                  <Option key={purchase.id} value={purchase?.id}>
                    {`${dayjs(purchase.date).format(dateFormatUser)} ID: ${purchase.id} ${purchase.product?.title}`}
                  </Option>
                ))
                : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Количество"
          name="amount"
          rules={[{required: true, message: "введите количество"}]}
        >
          <InputNumber style={{width: "100%"}}/>
        </Form.Item>
        <Form.Item
          label="Дата"
          name="date"
          rules={[{required: true, message: 'выберите дату'}]}
        >
          <DatePicker
            style={{width: '100%'}}
            format={dateFormatUser}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};