import React, {useEffect, useState} from "react";
import {AddModalProps, ProductType, UnitType} from "../../../types/_index";
import {Form, Input, Modal, Select} from "antd";
import {getAllUnits, getAllProductGroups} from "../../../services";

const {Option} = Select;

export const AddModalProduct: React.FC<AddModalProps<ProductType>> = ({
                                                            isOpen,
                                                            addItem,
                                                            onCancel,
                                                          }) => {
  const [form] = Form.useForm();

  // Единицы измерения
  const [units, setUnits] = useState<UnitType[]>();
  const [selectedUnit, setSelectedUnit] = useState<UnitType>();

  // Товарные группы
  const [productGroups, setProductGroups] = useState<ProductType[]>();
  const [selectedProductGroup, setSelectedProductGroup] = useState<ProductType>();

  const onChangeUnit = (values: string, option: any): UnitType => {
    const unit: UnitType = {
      id: option.id,
      name: values,
    };
    form.setFieldsValue({
      unit: unit
    });
    setSelectedUnit(unit)
    return unit
  };

  const onChangeProductGroup = (values: string, option: any): ProductType => {
    const productGroup: ProductType = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      productGroup: productGroup
    });
    setSelectedProductGroup(productGroup)
    return productGroup
  };

  useEffect(() => {
    getAllUnits().then((units) => {
      setUnits(units);
    });
  }, []);

  useEffect(() => {
    getAllProductGroups().then((productGroups) => {
      setProductGroups(productGroups);
    });
  }, []);

  return (
    <Modal
      title={`Добавление нового товара`}
      open={isOpen}
      onCancel={()=> {
        setSelectedUnit(undefined);
        setSelectedProductGroup(undefined);
        onCancel()
      }}
      width={700}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            setSelectedUnit(undefined);
            setSelectedProductGroup(undefined);
            addItem(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        initialValues={{
          modifier: 'public'
        }}
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
              {units && units.length > 0 ?
                units.map(unit => (
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
              {productGroups && productGroups.length > 0 ?
                productGroups.map(productGroup => (
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