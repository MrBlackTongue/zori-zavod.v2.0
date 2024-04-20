import React, { useEffect } from 'react';
import { StockProductsTableView } from './StockProductsTable.view';
import { useDataListLoader } from '../../../../hooks';
import { TypeStock } from '../../../../types';
import usePagination from '../../../../hooks/usePagination';
import { BasicTableProvider } from '../../../../contexts/BasicTableContext';
import { getAllStockProducts, PRODUCT } from '../../../../api';
import useNavigateToPath from '../../../../hooks/useNavigateToPath';

export const StockProductsTableContainer: React.FC = () => {
  // Хук для загрузки и получения всех данных
  const { isLoading, dataList, getDataList } = useDataListLoader<TypeStock[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Хук для навигации
  const handleNavigateToForm = useNavigateToPath(PRODUCT);

  // Функция, которая вызывается для обновления данных в таблице
  useEffect(() => {
    const executeFetch = async () => {
      try {
        await getDataList(getAllStockProducts);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    executeFetch().catch(error => console.error(error));
  }, [getDataList]);

  return (
    <BasicTableProvider<TypeStock>
      value={{
        data: dataList,
        isLoading,
        pagination,
        handleChangeTable,
        handleNavigateToForm,
      }}>
      <StockProductsTableView />
    </BasicTableProvider>
  );
};
