import React, {useState, useEffect} from "react";
import {AddModalProps, TypeProduct, TypeUnit} from "../../../types";
import {Form, Input, Modal, Select} from "antd";
import {getAllUnit, getAllProductGroup} from "../../../services";

const {Option} = Select;

export const AddModalProduct: React.FC<AddModalProps<TypeProduct>> = ({
                                                                        isOpen,
                                                                        addItem,
                                                                        onCancel,
                                                                      }) => {
  const [form] = Form.useForm();

  // Единицы измерения, выбранная единица измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();
  const [selectedUnit, setSelectedUnit] = useState<TypeUnit>();

  // Товарные группы, выбранная товарная группа
  const [allProductGroup, setAllProductGroup] = useState<TypeProduct[]>();
  const [selectedProductGroup, setSelectedProductGroup] = useState<TypeProduct>();

  // Изменить выбранную единицу измерения
  const onChangeUnit = (value: string, option: any): void => {
    const unit: TypeUnit = {
      id: option.id,
      name: value,
    };
    form.setFieldsValue({unit: unit});
    setSelectedUnit(unit)
  };

  // Изменить выбранную товарную группу
  const onChangeProductGroup = (value: string, option: any): void => {
    const productGroup: TypeProduct = {
      id: option.id,
      title: value,
    };
    form.setFieldsValue({productGroup: productGroup});
    setSelectedProductGroup(productGroup)
  };

  // Функция подтверждения добавления
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setSelectedUnit(undefined);
        setSelectedProductGroup(undefined);
        addItem(values);
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  }

  // Функция закрытия модального окна
  const handleClose = (): void => {
    setSelectedUnit(undefined);
    setSelectedProductGroup(undefined);
    onCancel()
  };

  useEffect(() => {
    getAllUnit().then((units) => {
      setAllUnit(units);
    });
  }, []);

  useEffect(() => {
    getAllProductGroup().then((productGroups) => {
      setAllProductGroup(productGroups);
    });
  }, []);

  return (
    <Modal
      title={`Добавление нового товара`}
      open={isOpen}
      onCancel={handleClose}
      width={700}
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
          label="Название товара"
          name="title"
          rules={[{required: true, message: 'введите название'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Единица измерения"
          name="unit"
          rules={[{type: 'object' as const, required: true, message: 'выберите ед. изм.'}]}
        >
          <div>
            <Select
              value={selectedUnit ? selectedUnit.name : undefined}
              onChange={onChangeUnit}
            >
              {allUnit && allUnit.length > 0 ?
                allUnit.map(unit => (
                  <Option id={unit.id} key={unit.id} value={unit.name}>
                    {unit.name}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Товарная группа"
          name="productGroup"
          rules={[{type: 'object' as const, required: true, message: 'выберите тов. группу'}]}
        >
          <div>
            <Select
              value={selectedProductGroup ? selectedProductGroup.title : undefined}
              onChange={onChangeProductGroup}
            >
              {allProductGroup && allProductGroup.length > 0 ?
                allProductGroup.map(productGroup => (
                  <Option id={productGroup.id} key={productGroup.id} value={productGroup.title}>
                    {productGroup.title}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}