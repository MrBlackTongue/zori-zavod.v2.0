import React, {useEffect, useState} from "react";
import {AddModalProps} from "../../../types/CommonComponentProps";
import {AcceptanceType} from "../../../types/AcceptanceType";
import {DatePicker, Form, InputNumber, Modal, Select} from "antd";
import {getAllAcceptances} from "../../../services";
const {Option} = Select;
const dateFormatUser = 'DD.MM.YYYY';

export const AddModalAcceptance: React.FC<AddModalProps<AcceptanceType>> = ({
                                                                    isOpen,
                                                                    addItem,
                                                                    onCancel,
                                                                          }) => {
  const [form] = Form.useForm();

  const [acceptance, setAcceptance] = useState<AcceptanceType[]>();
  const [selectedAcceptance, setSelectedAcceptance] = useState<AcceptanceType>();

  useEffect(() => {
    getAllAcceptances().then((acceptance) => {
      setAcceptance(acceptance);
    });
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedAcceptance(undefined)
        addItem(values);
      })
      .catch((error) => {
        console.log("Validate Failed:", error);
      });
  };

  return (
    <Modal
      title={`Добавление новой приемки`}
      open={isOpen}
      onCancel={() => {
        onCancel()
        setSelectedAcceptance(undefined)
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
          label="Товар"
          name="product"
          rules={[{required: true, message: 'выберите товар'}]}
        >
          <div>
            <Select
              value={selectedAcceptance ? selectedAcceptance.id : undefined}
            //  onChange={onChangeAcceptance}
            >
              {acceptance && acceptance.length > 0 ?
                acceptance.map(acceptance => (
                  <Option id={acceptance.id} key={acceptance.id} value={acceptance.id}>
                    {acceptance.id}
                  </Option>
                )) : null}
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
