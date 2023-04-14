import React, {useEffect, useState} from "react";
import {AddModalProps, TypePurchase, TypeAcceptance} from "../../../types";
import {DatePicker, Form, InputNumber, Modal, Select} from "antd";
import {getAllAcceptances, getAllPurchase} from "../../../services";
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
  const [allAcceptance, setAcceptance] = useState<TypeAcceptance[]>();
  const [selectedAcceptance, setSelectedAcceptance] = useState<TypeAcceptance>();

  // Закупка, выбрать закупку
  const [allPurchase, setAllPurchase] = useState<TypePurchase[]>();
  const [selectedPurchase, setSelectedPurchase] = useState<TypePurchase>();

  // Изменить выбранный товар
  const onChangeAcceptance = (value: number): void => {
    const acceptance = allAcceptance?.find((acceptance) => acceptance.id === value);
    console.log('Selected acceptance:', acceptance);
    setSelectedAcceptance(acceptance);
    form.setFieldsValue({
      stock: acceptance?.stock,
      purchase: acceptance?.purchase,
    });
  };

  // Изменить выбранную закупку
  const onChangePurchase = (value: number): void => {
    const purchase = allPurchase?.find((purchase) => purchase.id === value);
    console.log('Selected purchase:', purchase);
    setSelectedPurchase(purchase);
    form.setFieldsValue({
      purchase: purchase,
    });
  };

  // Функция валидации добавления новой приемки
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('дочерний values', values)
        form.resetFields();
        setSelectedAcceptance(undefined);
        setSelectedPurchase(undefined);
        addItem(values);
      })
      .catch((error) => {
        console.log("Validate Failed:", error);
      });
  };

  useEffect(() => {
    getAllAcceptances().then((acceptance) => {
      setAcceptance(acceptance);
    });
  }, []);

  useEffect(() => {
    getAllPurchase().then((purchase) => {
      setAllPurchase(purchase);
    });
  }, []);

  return (
    <Modal
      title={`Добавление новой приемки`}
      open={isOpen}
      onCancel={() => {
        onCancel()
        setSelectedAcceptance(undefined)
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
        }}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Товар на складе"
          name="stock"
         // rules={[{required: true, message: 'выберите товар'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
              value={selectedAcceptance?.id}
              onChange={onChangeAcceptance}
            >
              {allAcceptance && allAcceptance.length > 0
                ? allAcceptance.map((acceptance) => (
                  <Option key={acceptance.id} value={acceptance?.id}>
                    {acceptance.stock?.product?.title} {`ID: ${acceptance.id}, ${acceptance?.id}`}
                  </Option>
                ))
                : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Закупка"
          name="purchase"
       //   rules={[{required: true, message: 'выберите закупку'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
              value={selectedPurchase?.id}
              onChange={onChangePurchase}
            >
              {allPurchase && allPurchase.length > 0
                ? allPurchase.map((purchase) => (
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
