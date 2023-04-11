import React, {useEffect, useState} from "react";
import {AddModalProps, TypePurchase, TypeAcceptance} from "../../../types";
import {DatePicker, Form, InputNumber, Modal, Select, message} from "antd";
import {getAllAcceptances, getAllPurchase} from "../../../services";

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
      productBatch: acceptance?.productBatch,
    });
  };

  // Изменить выбранную закупку
  const onChangePurchase = (value: number): void => {
    const purchase = allPurchase?.find((purchase) => purchase.id === value);
    console.log('Selected purchase:', purchase);
    setSelectedPurchase(purchase);
    form.setFieldsValue({
      productBatch: purchase?.productBatch?.id,
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (!selectedAcceptance || !selectedPurchase) {
          message.error('Выберите товар и закупку');
          return;
        }
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
      width={500}
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
          rules={[{required: true, message: 'выберите товар'}]}
        >
          <div>
            <Select
              value={selectedAcceptance?.id}
              onChange={onChangeAcceptance}
            >
              {allAcceptance && allAcceptance.length > 0
                ? allAcceptance.map((acceptance) => (
                  <Option key={acceptance.id} value={acceptance.id}>
                    {acceptance.stock?.product?.title}
                  </Option>
                ))
                : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Закупка"
          name="productBatch"
          rules={[{required: true, message: 'выберите закупку'}]}
        >
          <div>
            <Select
              value={selectedPurchase?.id}
              onChange={onChangePurchase}
            >
              {allPurchase && allPurchase.length > 0
                ? allPurchase.map((purchase) => (
                  <Option key={purchase.id} value={purchase.id}>
                    {purchase.product?.title}
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
