import React, { useCallback, useEffect, useState } from 'react';
import { TypeProductMovement } from '../../../../types';
import { ProductMovementTableView } from './ProductMovementTable.view';
import { useParams } from 'react-router-dom';
import { getProductMovementByIdAndEntityType } from '../../../../api';

export const ProductMovementTableContainer = () => {
  const [data, setData] = useState<TypeProductMovement[]>();

  // Преобразование id из пути в число
  const { id: rawId } = useParams<{ id?: string }>();
  const itemId = rawId ? parseInt(rawId, 10) : undefined;

  // Обновить таблицу
  const handleUpdateTable = useCallback(() => {
    if (itemId) {
      getProductMovementByIdAndEntityType('STOCK_ADJUSTMENT', itemId)
        .then(data => {
          setData(data);
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [itemId]);

  useEffect(() => {
    handleUpdateTable();
  }, [handleUpdateTable]);

  return <ProductMovementTableView data={data} />;
};
