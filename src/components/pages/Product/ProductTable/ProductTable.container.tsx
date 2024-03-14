import React, { useCallback, useEffect, useState } from 'react';
import {
  deleteProductById,
  getAllProduct,
  getAllProductByTitle,
  PRODUCT,
} from '../../../../api';
import { TypeProduct } from '../../../../types';
import { ProductTableView } from './ProductTable.view';
import { useDataListLoader } from '../../../../hooks';
import usePagination from '../../../../hooks/usePagination';
import useNavigateToPath from '../../../../hooks/useNavigateToPath';
import useRowSelection from '../../../../hooks/useRowSelection';
import { BasicTableProvider } from '../../../../contexts/BasicTableContext';

export const ProductTableContainer: React.FC = () => {
  // Текст поиска
  const [searchText, setSearchText] = useState<string>('');

  // Хук для загрузки и получения всех данных
  const { isLoading, dataList, getDataList } =
    useDataListLoader<TypeProduct[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Хук для навигации
  const handleNavigateToForm = useNavigateToPath(PRODUCT);

  // Хук для выбора строк
  const {
    hasSelected,
    rowSelection,
    selectedRowKeys,
    setSelectedRowKeys,
    handleClearSelected,
  } = useRowSelection<TypeProduct>();

  // Функция для поиска
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Функция массового удаления
  const handleDeleteSelected = useCallback(() => {
    (async () => {
      try {
        // Проходим по всем выбранным ключам и удаляем соответствующие записи
        await Promise.all(
          selectedRowKeys.map(key => deleteProductById(Number(key))),
        );
        await getDataList(getAllProduct);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Ошибка при удалении записи', error.message);
        }
      } finally {
        setSelectedRowKeys([]);
      }
    })();
  }, [selectedRowKeys, getDataList, setSelectedRowKeys]);

  // Функция, которая вызывается для обновления данных в таблице
  useEffect(() => {
    const executeFetch = async () => {
      try {
        if (searchText) {
          await getDataList(() => getAllProductByTitle(searchText));
        } else {
          await getDataList(getAllProduct);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    executeFetch().catch(error => console.error(error));
  }, [searchText, getDataList]);

  return (
    <BasicTableProvider<TypeProduct>
      value={{
        data: dataList,
        isLoading,
        pagination,
        selectedRowKeys,
        hasSelected,
        rowSelection,
        handleNavigateToForm,
        handleChangeTable,
        handleDeleteSelected,
        handleClearSelected,
        searchText,
        setSearchText,
        handleSearchChange,
      }}>
      <ProductTableView />
    </BasicTableProvider>
  );
};
