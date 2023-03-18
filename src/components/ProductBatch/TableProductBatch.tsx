import React, {useState, useEffect} from "react";
import {Table, Button, Space, Tooltip, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ColumnsType, TablePaginationConfig, SorterResult} from "antd/es/table/interface";
import {ItemTableProps, ProductBatchTypes, TableParams, UnitTypes} from "../../types";
import {getAllProductBatch, deleteProductBatchById} from "../../services";


export const TableProductBatch: React.FC<ItemTableProps<ProductBatchTypes>> = ({
                                                                         isUpdateTable,
                                                                         openDrawer,
                                                                       }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех партий товаров
  const [loading, setLoading] = useState(false);
  const [allProductBatch, setAllProductBatch] = useState<ProductBatchTypes[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<ProductBatchTypes> = [
    {
      title: 'Идентификатор',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: ((product: any) =>
        product !== null ? (<div key={product.id}>{product.title}</div>) : null)
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => (a.amount ?? '') < (b.amount ?? '') ? -1 : 1,
      // render: ((amount: number | null) =>
      //   // amount !== null ? (
      //   //   <div>
      //   //     {amount.toLocaleString('ru-RU', {
      //   //       currency: 'RUB',
      //   //       maximumFractionDigits: 2,
      //   //     })}
      //   //   </div>
      //   // ) : null)
    },
    {
      title: 'Ед. изм',
      dataIndex: ['product', 'unit'],
      key: 'unit',
      render: ((unit: UnitTypes) =>
        unit !== null ? (<div key={unit.id}>{unit.name}</div>) : null)
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: ((id: number) => (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => {
                openDrawer(id)
              }}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              title="Вы действительно хотите удалить эту партию товара?"
              onConfirm={() => {
                deleteProductBatchById(id).then(() => {
                  getAllProductBatch().then((allProductBatch) => setAllProductBatch(allProductBatch))
                })
              }}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle"
                      style={{color: 'tomato', borderColor: 'tomato'}} ghost onClick={() => {
              }}>
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ];

  // Параметры изменения таблицы
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<ProductBatchTypes>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllProductBatch([]);
    }
  };

  // Функция для обновления таблицы партии товаров
  const updateTable = () => {
    setLoading(true);
    getAllProductBatch().then((allProductBatch) => {
      setAllProductBatch(allProductBatch);
      setLoading(false);
    });
  }
  
  // Обновление таблицы партии товаров
  useEffect(() => {
    updateTable();
  }, [!isUpdateTable]);
  
  return (
    <Table
      columns={columns}
      dataSource={allProductBatch}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};