import React, { useState } from 'react';
import {
  Button,
  FloatButton,
  Input,
  Select,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  createStock,
  deleteStockById,
  getStockById,
  updateStock,
} from '../../services';
import { TypeStock, TypeStockFormValue } from '../../types';
import { TableStock } from './components/TableStock';
import { CreateModalStock } from './components/CreateModalStock';
import { UpdateDrawerStock } from './components/UpdateDrawerStock';
import { useFetchAllData } from '../../hooks';

export const PageStock: React.FC = () => {
  const { Title } = Typography;
  const { Option } = Select;

  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Хук для получения данных
  const { allProductGroup } = useFetchAllData({ depsProductGroup: true });

  // id выбранной группы товаров, Выбранная ячейка остатков
  const [selectedProductGroupId, setSelectedProductGroupId] =
    useState<number>();
  const [selectedStock, setSelectedStock] = useState<TypeStock>();

  // Текст поиска
  const [searchText, setSearchText] = useState<string>('');

  // Изменить выбранную группу товаров
  const onChangeProductGroup = (value: any): void => {
    setSelectedProductGroupId(value || undefined);
  };

  // Поиск по select
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  };

  // Добавить новую ячейку на складе
  const handleCreateStock = async (
    values: TypeStockFormValue,
  ): Promise<void> => {
    const stock: TypeStock = {
      amount: 0,
      product: { id: values.product },
      storagePlace: { id: values.storagePlace },
    };
    setIsModalOpen(false);
    await createStock(stock);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    void getStockById(id).then(data => setSelectedStock(data));
    setIsDrawerOpen(true);
  };

  // Обновить товар на складе
  const handleUpdateStock = async (
    values: TypeStockFormValue,
  ): Promise<void> => {
    const stock: TypeStock = {
      id: selectedStock?.id,
      amount: selectedStock?.amount,
      product: { id: values.product },
      storagePlace: { id: values.storagePlace },
    };
    setIsDrawerOpen(false);
    await updateStock(stock);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteStock = async (id: number): Promise<void> => {
    await deleteStockById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="content-title-bar">
        <Title level={3}>Остатки</Title>
        <Space>
          <Input
            placeholder="Поиск по товарам"
            onChange={event => setSearchText(event.target.value)}
            style={{ width: '210px' }}
            allowClear
            prefix={<SearchOutlined />}
          />
          <Select
            showSearch
            allowClear
            placeholder="Выберите товарную группу"
            style={{ width: '250px' }}
            onChange={onChangeProductGroup}
            filterOption={onSearchSelect}>
            {allProductGroup && allProductGroup.length > 0
              ? allProductGroup.map(productGroup => (
                  <Option
                    key={productGroup.id}
                    value={productGroup.id}
                    label={productGroup.title}>
                    <Tooltip placement="right" title={productGroup.title}>
                      {productGroup.title}
                    </Tooltip>
                  </Option>
                ))
              : null}
          </Select>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}>
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop />
      <TableStock
        isUpdateTable={isUpdateTable}
        onDelete={handleDeleteStock}
        openDrawer={openDrawer}
        searchText={searchText}
        filter={{ id: selectedProductGroupId }}
      />
      <CreateModalStock
        isOpen={isModalOpen}
        createItem={handleCreateStock}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerStock
        isOpen={isDrawerOpen}
        selectedItemId={selectedStock?.id}
        updateItem={handleUpdateStock}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
