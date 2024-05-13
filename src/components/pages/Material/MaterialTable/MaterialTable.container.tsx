import React, { useCallback, useEffect, useState } from 'react';
import {
  deleteMaterialById,
  getAllMaterialByTitle,
  getAllMaterials,
  ITEMS,
  MATERIAL,
} from '../../../../api';
import { TypeMaterial } from '../../../../types';
import { MaterialTableView } from './MaterialTable.view';
import usePagination from '../../../../hooks/usePagination';
import { useDataListLoader } from '../../../../hooks';
import useNavigateToPath from '../../../../hooks/useNavigateToPath';
import useRowSelection from '../../../../hooks/useRowSelection';
import { BasicTableProvider } from '../../../../contexts/BasicTableContext';

export const MaterialTableContainer = () => {
  // Текст поиска
  const [searchText, setSearchText] = useState<string>('');

  // Хук для загрузки и получения всех данных
  const { isLoading, dataList, getDataList } =
    useDataListLoader<TypeMaterial[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Хук для навигации
  const handleNavigateToForm = useNavigateToPath(`${ITEMS}${MATERIAL}`);

  // Хук для выбора строк
  const {
    hasSelected,
    rowSelection,
    selectedRowKeys,
    setSelectedRowKeys,
    handleClearSelected,
  } = useRowSelection<TypeMaterial>();

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
          selectedRowKeys.map(key => deleteMaterialById(Number(key))),
        );
        await getDataList(getAllMaterials);
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
          await getDataList(() => getAllMaterialByTitle(searchText));
        } else {
          await getDataList(getAllMaterials);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    executeFetch().catch(error => console.error(error));
  }, [searchText, getDataList]);

  return (
    <BasicTableProvider<TypeMaterial>
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
      <MaterialTableView />
    </BasicTableProvider>
  );
};
