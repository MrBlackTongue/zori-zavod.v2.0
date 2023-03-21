import {Button, Drawer, Form, Input, Select, Space} from "antd";
import React, {useEffect, useState} from "react";
import {EditItemProps, ProductTypes, UnitTypes} from "../../types";
import {getAllProductGroups, getProductById, getAllUnits} from "../../services";

const {Option} = Select;

export const EditDrawerProduct: React.FC<EditItemProps<ProductTypes>> = ({
                                                            isOpen,
                                                            selectedItemId,
                                                            closeDrawer,
                                                            updateItem,
                                                          }) => {
  const [form] = Form.useForm();

  // Единицы измерения
  const [units, setUnits] = useState<UnitTypes[]>();
  const [selectedUnit, setSelectedUnit] = useState<UnitTypes>();
  const [unit, setUnit] = useState<UnitTypes>()

  // Товарные группы
  const [productGroups, setProductGroups] = useState<ProductTypes[]>();
  const [selectedProductGroup, setSelectedProductGroup] = useState<ProductTypes>();
  const [productGroup, setProductGroup] = useState<ProductTypes>()

  const onChangeUnit = (values: string, option: any): UnitTypes => {
    const unit: UnitTypes = {
      id: option.id,
      name: values,
    };
    form.setFieldsValue({
      unit: unit
    });
    setSelectedUnit(unit)
    return unit
  };

  const onChangeProductGroup = (values: string, option: any): ProductTypes => {
    const productGroup: ProductTypes = {
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

  useEffect(() => {
    if (selectedItemId) {
      getProductById(selectedItemId).then((product) => {
        form.setFieldsValue(product)
        setSelectedUnit(product?.unit)
        setUnit(product?.unit)
        setSelectedProductGroup(product?.productGroup)
        setProductGroup(product?.productGroup)
      })
    }
  }, [selectedItemId, getProductById]);

  return (
    <Drawer
      title="Редактирование товара"
      width={700}
      open={isOpen}
      onClose={()=> {
        setSelectedUnit(unit);
        setSelectedProductGroup(productGroup);
        closeDrawer()
      }}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={()=> {
            setSelectedUnit(unit);
            setSelectedProductGroup(productGroup);
            closeDrawer()
          }}>Отмена</Button>
          <Button onClick={() => {
            closeDrawer()
            form
              .validateFields()
              .then((values) => {
                updateItem(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          }} type="primary" form='change-product' htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        name="change-product"
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
    </Drawer>
  )
}