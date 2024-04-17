import React, { useEffect, useState } from 'react';
import { StockAllTableView } from './StockAllTable.view';
import { useDataListLoader } from '../../../../hooks';
import { TypeStock } from '../../../../types';
import usePagination from '../../../../hooks/usePagination';
import { BasicTableProvider } from '../../../../contexts/BasicTableContext';
import {
  getAllStock,
  getAllStockByFilter,
  getAllStockByTitle,
} from '../../../../api';

export const StockAllTableContainer: React.FC = () => {
  // Текст поиска
  const [searchText, setSearchText] = useState<string>('');

  // Хук для загрузки и получения всех данных
  const { isLoading, dataList, getDataList } = useDataListLoader<TypeStock[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Состояние для фильтров
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Функция для обработки изменений фильтров
  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  // Функция для поиска
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Функция, которая вызывается для обновления данных в таблице
  useEffect(() => {
    const executeFetch = async () => {
      try {
        if (searchText) {
          await getDataList(() => getAllStockByTitle(searchText));
        } else if (filters?.categoryId) {
          await getDataList(() => getAllStockByFilter(filters?.categoryId));
        } else {
          await getDataList(getAllStock);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    executeFetch().catch(error => console.error(error));
  }, [searchText, getDataList, filters]);

  return (
    <BasicTableProvider<TypeStock>
      value={{
        data: dataList,
        isLoading,
        pagination,
        handleChangeTable,
        searchText,
        setSearchText,
        handleSearchChange,
        handleFilterChange,
      }}>
      <StockAllTableView />
    </BasicTableProvider>
  );
};
