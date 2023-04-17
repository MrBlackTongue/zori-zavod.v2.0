import React, {useEffect, useState} from "react";
import {AddModalProps, TypePurchase, TypeAcceptance, TypeStock} from "../../../types";
import {DatePicker, Form, InputNumber, Modal, Select} from "antd";
import {getAllStocks, getAllPurchase, getAllAcceptances} from "../../../services";
import dayjs from "dayjs";

const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY';

export const AddModalAcceptance: React.FC<AddModalProps<TypeAcceptance>> = ({
                                                                              isOpen,
                                                                              addItem,
                                                                              onCancel,
                                                                            }) => {
  const [form] = Form.useForm();

  // Товар со склада, выбрать товар со склада
  const [allStocks, setAllStocks] = useState<TypeAcceptance[]>();
  const [selectedStock, setSelectedStock] = useState<TypeAcceptance>();

  // Закупка, выбрать закупку
  const [allPurchase, setAllPurchase] = useState<TypePurchase[]>();
  const [selectedPurchase, setSelectedPurchase] = useState<TypePurchase>();

  // Поиск по закупкам
  const [filteredPurchase, setFilteredPurchase] = useState<TypePurchase[]>([]);

  // Поиск по товару на складе
  const [filteredStocks, setFilteredStocks] = useState<TypeAcceptance[]>([]);

  // Изменить выбранный товар
  const onChangeStock = (value: number): void => {
    const stocks = allStocks?.find((stocks) => stocks.id === value);
    setSelectedStock(stocks);
    form.setFieldsValue({
      stock: stocks?.stock,
      purchase: stocks?.purchase,
    });
  };

  // Изменить выбранную закупку
  const onChangePurchase = (value: number): void => {
    const purchase = allPurchase?.find((purchase) => purchase.id === value);
    setSelectedPurchase(purchase);
    form.setFieldsValue({
      purchase: purchase,
    });
  };

  // Функция фильтрации товара на складе
  const onSearchStocks = (searchText: string) => {
    if (searchText === '') {
      setFilteredStocks(allStocks || []);
    } else {
      const filtered = allStocks?.filter((stocks) => {
        const matchesTitle = stocks.stock && stocks.stock.product && stocks.stock.product.title
          ? stocks.stock.product.title.toLowerCase().includes(searchText.toLowerCase())
          : false;

        const matchesId = stocks.id ? stocks.id.toString().includes(searchText) : false;

        return matchesTitle || matchesId;
      });
      setFilteredStocks(filtered || []);
    }
  };

// Функция фильтрации закупок
  const onSearchPurchase = (searchText: string) => {
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

  // Функция валидации добавления новой приемки
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedStock(undefined);
        setSelectedPurchase(undefined);
        addItem(values);
      })
      .catch((error) => {
        console.log("Validate Failed:", error);
      });
  };

  useEffect(() => {
    getAllStocks().then((stocks) => {
     // setSelectedStock(stocks);
      setFilteredStocks(stocks);
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
      onCancel={() => {
        form.resetFields();
        onCancel()
        setSelectedStock(undefined)
        setSelectedPurchase(undefined)
      }}
      width={550}
      okText={"Сохранить"}
      cancelText={"Отмена"}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{
          modifier: "public",
          amount: 0,
        }}
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
              value={selectedStock?.id}
              onChange={onChangeStock}
              onSearch={onSearchStocks}
            >
              {filteredStocks && filteredStocks.length > 0
                ? filteredStocks.map((stock) => (
                  <Option key={stock.id} value={stock?.id}>
                    {stock.stock?.product?.title} {`ID: ${stock.id}, ${stock?.amount}`}
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
              value={selectedPurchase?.id}
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
          rules={[{type: 'object' as const, required: true, message: 'выберите дату'}]}
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
