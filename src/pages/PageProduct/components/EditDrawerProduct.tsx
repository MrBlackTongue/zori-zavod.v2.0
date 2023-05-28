import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Form, Input, Select, Space} from "antd";
import {EditDrawerProps, TypeProduct, TypeUnit} from "../../../types";
import {getAllProductGroup, getProductById, getAllUnit} from "../../../services";

const {Option} = Select;

export const EditDrawerProduct: React.FC<EditDrawerProps<TypeProduct>> = ({
                                                                            isOpen,
                                                                            selectedItemId,
                                                                            closeDrawer,
                                                                            updateItem,
                                                                          }) => {
  const [form] = Form.useForm();

  // Единицы измерения, выбранная единица измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();
  const [selectedUnit, setSelectedUnit] = useState<TypeUnit>();
  // const [unit, setUnit] = useState<TypeUnit>()

  // Все товарные группы, выбранная товарная группа
  const [allProductGroup, setAllProductGroup] = useState<TypeProduct[]>();
  const [selectedProductGroup, setSelectedProductGroup] = useState<TypeProduct>();

  // Изменить выбранную единицу измерения
  const onChangeUnit = (values: string, option: any): void => {
    const unit: TypeUnit = {
      id: option.id,
      name: values,
    };
    form.setFieldsValue({
      unit: unit
    });
    setSelectedUnit(unit)
  };

  // Изменить выбранную товарную группу
  const onChangeProductGroup = (values: string, option: any): void => {
    const productGroup: TypeProduct = {
      id: option.id,
      title: values,
    };
    form.setFieldsValue({
      productGroup: productGroup
    });
    setSelectedProductGroup(productGroup)
  };

  // Функция подтверждения редактирования
  const handleOk = (): void => {
    closeDrawer()
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      })
  }

  // Функция закрытия дравера
  const handleClose = (): void => {
    setSelectedUnit(undefined);
    setSelectedProductGroup(undefined);
    closeDrawer()
  };

  // Функция для получения данных в дравер
  const handleGetProductById = useCallback(() => {
    if (selectedItemId) {
      getProductById(selectedItemId).then((product) => {
        form.setFieldsValue(product)
        setSelectedUnit(product?.unit)
        setSelectedProductGroup(product?.productGroup)
      })
    }
  }, [selectedItemId, form])

  useEffect(() => {
    handleGetProductById()
  }, [selectedItemId, handleGetProductById]);

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
    <Drawer
      title="Редактирование товара"
      width={700}
      open={isOpen}
      onClose={handleClose}
      extra={
        <Space>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleOk} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
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
    </Drawer>
  )
}