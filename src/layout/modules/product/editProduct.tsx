import {Button, Drawer, Form, Input, InputNumber, Select, Space} from "antd";
import React, {useEffect, useState} from "react";
import {EditProductProps, ProductType} from "../../../types/productType";
import {getAllProductGroups, getProductById} from "../../../requests/productsRequests";
import {UnitType} from "../../../types/unitType";
import {getAllUnits} from "../../../requests/unitsRequests";

const {Option} = Select;

export const EditProduct: React.FC<EditProductProps> = ({
                                                            isOpen,
                                                            selectedProductId,
                                                            closeDrawer,
                                                            updateProduct,
                                                          }) => {
  const [form] = Form.useForm();

  const [units, setUnits] = useState<UnitType[]>();
  const [selectedUnit, setSelectedUnit] = useState<UnitType>();
  const [unit, setUnit] = useState<UnitType>()

  const [productGroups, setProductGroups] = useState<ProductType[]>();
  const [selectedProductGroup, setSelectedProductGroup] = useState<ProductType>();
  const [productGroup, setProductGroup] = useState<ProductType>()



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

  useEffect(() => {
    if (selectedProductId) {
      getProductById(selectedProductId).then((product) => {
        form.setFieldsValue(product)
        console.log('product', product)
        setSelectedUnit(product?.unit)
        setUnit(product?.unit)
        setSelectedProductGroup(productGroup?.productGroup)
        setProductGroup(product?.productGroup)
      })
    }
  }, [selectedProductId, getProductById]);

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
                console.log('value', values)
                updateProduct(values);
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