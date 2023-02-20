import React, {useEffect, useState} from "react";
import {AddProductProps, ProductType} from "../../../types/productType";
import {Form, Input, Modal, Select} from "antd";
import {UnitType} from "../../../types/unitType";
import {getAllUnits} from "../../../requests/unitsRequests";
import {getAllProductGroups} from "../../../requests/productsRequests";

const {Option} = Select;

export const AddProduct: React.FC<AddProductProps> = ({
                                                            isOpen,
                                                            addProduct,
                                                            onCancel,
                                                          }) => {
  const [form] = Form.useForm();

  const [units, setUnits] = useState<UnitType[]>();
  const [selectedUnit, setSelectedUnit] = useState<UnitType>();

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
            addProduct(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        name="add-new-product"
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
          rules={[{required: true, message: 'Пожалуйста введите название'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Единица измерения"
          name="unit"
          rules={[{type: 'object' as const, required: true, message: 'Пожалуйста выберите ед. изм.'}]}

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
          rules={[{type: 'object' as const, required: true, message: 'Пожалуйста выберите тов. группу'}]}
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