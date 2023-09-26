import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {getAllAcceptance, getAllAcceptanceByTitle} from "../../../services";
import {TableProps, TypeAcceptance, TypeUnit, TypeStock, TypeProduct, TypePurchase} from "../../../types";
import dayjs from "dayjs";
import {renderNumber} from "../../../utils/numberUtils";

export const TableAcceptance: React.FC<TableProps> = ({
                                                        isUpdateTable,
                                                        searchText,
                                                        onDelete,
                                                      }) => {
  // Лоудер и список всех приемок
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allAcceptance, setAllAcceptance] = useState<TypeAcceptance[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeAcceptance> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'ID ячейки',
      dataIndex: 'stock',
      key: 'stock',
      render: ((stock: TypeStock) =>
        stock !== null ? (<div>{stock.id}</div>) : null)
    },
    {
      title: 'Товар',
      dataIndex: ['stock', 'product'],
      key: 'product',
      render: ((product: TypeProduct) =>
        product !== null ? (<div>{product?.title}</div>) : null)
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
      render: renderNumber,
    },
    {
      title: 'Ед. изм',
      dataIndex: ['stock', 'product', 'unit'],
      key: 'unit',
      render: ((unit: TypeUnit) =>
        unit !== null ? (<div>{unit.name}</div>) : null)
    },
    {
      title: 'ID закупки',
      dataIndex: 'purchase',
      key: 'purchase',
      render: ((purchase: TypePurchase) =>
        purchase !== null ? (<div>{purchase.id}</div>) : null)
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: ((id: number) => (
        <Space>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту приемку?"
              onConfirm={() => onDelete?.(id)}
              okText="Да"
              cancelText="Отмена"
            >
              <Button
                type="primary"
                size="small"
                shape="circle"
                style={{color: 'tomato', borderColor: 'tomato'}}
                ghost
              >
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ]

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination((prevPagination) => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы приемок
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllAcceptance()
      .then((data) => {
        setAllAcceptance(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Ошибка при получении данных: ", error));
  }, [])

  // Функция для поиска приемки
  const handleSearchTable = useCallback((): void => {
    setIsLoading(true);
    getAllAcceptanceByTitle(searchText ?? '')
      .then((data) => {
        setAllAcceptance(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Ошибка при получении данных: ", error));
  }, [searchText])

  useEffect(() => {
    if (searchText) {
      handleSearchTable();
    } else {
      handleUpdateTable();
    }
  }, [searchText, isUpdateTable, handleSearchTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allAcceptance}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  );
};