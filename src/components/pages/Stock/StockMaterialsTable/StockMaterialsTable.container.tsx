import React, { useEffect } from 'react';
import { StockMaterialsTableView } from './StockMaterialsTable.view';
import { useDataListLoader } from '../../../../hooks';
import { TypeStock } from '../../../../types';
import usePagination from '../../../../hooks/usePagination';
import { BasicTableProvider } from '../../../../contexts/BasicTableContext';
import { getAllStockMaterials, MATERIAL } from '../../../../api';
import useNavigateToPath from '../../../../hooks/useNavigateToPath';

export const StockMaterialsTableContainer: React.FC = () => {
  // Хук для загрузки и получения всех данных
  const { isLoading, dataList, getDataList } = useDataListLoader<TypeStock[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Хук для навигации
  const handleNavigateToForm = useNavigateToPath(MATERIAL);

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
        handleNavigateToForm,
      }}>
      <StockMaterialsTableView />
    </BasicTableProvider>
  );
};
