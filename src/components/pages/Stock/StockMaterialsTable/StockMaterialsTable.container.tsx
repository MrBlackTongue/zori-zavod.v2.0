import React, { useEffect } from 'react';
import { StockMaterialsTableView } from './StockMaterialsTable.view';
import { useDataListLoader } from '../../../../hooks';
import { TypeStock } from '../../../../types';
import usePagination from '../../../../hooks/usePagination';
import { BasicTableProvider } from '../../../../contexts/BasicTableContext';
import { getAllStockMaterials } from '../../../../api';

export const StockMaterialsTableContainer: React.FC = () => {
  // Хук для загрузки и получения всех данных
  const { isLoading, dataList, getDataList } = useDataListLoader<TypeStock[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Функция, которая вызывается для обновления данных в таблице
  useEffect(() => {
    const executeFetch = async () => {
      try {
        await getDataList(getAllStockMaterials);
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
      }}>
      <StockMaterialsTableView />
    </BasicTableProvider>
  );
};
