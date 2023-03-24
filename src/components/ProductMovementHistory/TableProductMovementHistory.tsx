import React, {useState, useEffect} from "react";
import {Table, Button, Space} from "antd";
import type {ColumnsType} from "antd/es/table/interface";
import {ProductMovementHistoryType, TableParams} from "../../types";
import {getAllProductMovementHistories, getProductMovementHistoryById} from "../../services";
import dayjs from "dayjs";

export const TableProductMovementHistory: React.FC<ProductMovementHistoryType> = ({
                                                                      isUpdateTable,
                                                                    }) => {
  // Лоудер и список всех закупок
  const [loading, setLoading] = useState(false);
  const [getAllProductMovementHistories, setAllProductMovementHistories] = useState<ProductMovementHistoryType[]>();

  const columns: ColumnsType<ProductMovementHistoryType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
     title: 'Дата',
     dataIndex: 'date',
     key: 'date',
     render: ((date: any) =>
     date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },

  ];
}