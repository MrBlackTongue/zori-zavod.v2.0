import React, {useEffect, useState} from "react";
import {AddModalProps, TypeMeter, TypeMeterType} from "../../../types";
import {Form, Modal, Select, InputNumber} from "antd";
/*import {getAllMeterType} from "../../../services";*/

const {Option} = Select;

export const AddModalMeter: React.FC<AddModalProps<TypeMeter>> = ({
                                                                    isOpen,
                                                                    addItem,
                                                                    onCancel,
                                                                  }) => {
  const [form] = Form.useForm();

  // Все товары, выбранный товар, отфильтрованные товары
  const [allMeterType, setAllMeterType] = useState<TypeMeterType[]>();
  const [selectedMeterType, setSelectedMeterType] = useState<TypeMeterType>();
  const [filteredMeterType, setFilteredMeterType] = useState<TypeMeterType[]>([]);

  // Изменить выбранный товар
  const onChangeMeterType = (value: string): TypeMeterType | undefined => {
    const selectedMeterType = allMeterType?.find(meterType => meterType.id === parseInt(value));
    form.setFieldsValue({
      meterType: selectedMeterType
    });
    setSelectedMeterType(selectedMeterType);
    return selectedMeterType;
  };

  // Поиск по товарам
  const onSearchMeterType = (searchText: string) => {
    if (searchText === '') {
      setFilteredMeterType(allMeterType || []);
    } else {
      const searchLowerCase = searchText.toLowerCase();
      const filtered = allMeterType?.filter((meterType) => {
        const titleMatch = meterType && meterType.title
          ? meterType.title.toLowerCase().includes(searchLowerCase)
          : false;

        return titleMatch;
      });
      setFilteredMeterType(prevState => filtered || prevState);
    }
  };

  // Функция подтверждения добавления новой ячейки на склад
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedMeterType(undefined)
        addItem({...values, meterType: values.meterType});
        onSearchMeterType('')
      })
      .catch((error) => {
        console.log("Validate Failed:", error);
      });
  };

  // Функция закрытия модального окна
  const handleClose = () => {
    form.resetFields();
    setSelectedMeterType(undefined);
    onCancel()
  };

  useEffect(() => {
    /*getAllMeterType().then((allMeterType) => {
      setAllMeterType(allMeterType);
      setFilteredMeterType(allMeterType);
    });*/
  }, []);

  return (
    <Modal
      title={`Добавление новой ячейки на склад`}
      open={isOpen}
      onCancel={handleClose}
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
          name="meterType"
          rules={[{required: true, message: 'выберите товар'}]}
        >
          <div>
            <Select
              showSearch
              allowClear
              filterOption={false}
              value={selectedMeterType ? selectedMeterType.title : undefined}
              onChange={onChangeMeterType}
              onSearch={onSearchMeterType}
            >
              {filteredMeterType && filteredMeterType.length > 0 ?
                filteredMeterType.map(meterType => (
                  <Option id={meterType.id} key={meterType.id} value={meterType.id} title={meterType.title}>
                    {meterType.title}
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
          <InputNumber style={{width: "100%"}} min={0}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};