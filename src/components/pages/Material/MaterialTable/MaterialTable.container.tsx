import React, { useCallback, useEffect } from 'react';
import { deleteMaterialById, getAllMaterials, MATERIAL } from '../../../../api';
import { TypeMaterial } from '../../../../types';
import { MaterialTableView } from './MaterialTable.view';
import usePagination from '../../../../hooks/usePagination';
import { useDataListLoader } from '../../../../hooks';
import useNavigateToPath from '../../../../hooks/useNavigateToPath';
import useRowSelection from '../../../../hooks/useRowSelection';
import { BasicTableProvider } from '../../../../contexts/BasicTableContext';

export const MaterialTableContainer = () => {
  // Хук для загрузки и получения всех данных
  const { isLoading, dataList, getDataList } =
    useDataListLoader<TypeMaterial[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Хук для навигации
  const handleNavigateToForm = useNavigateToPath(MATERIAL);

  // Хук для выбора строк
  const {
    hasSelected,
    rowSelection,
    selectedRowKeys,
    setSelectedRowKeys,
    handleClearSelected,
  } = useRowSelection<TypeMaterial>();

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

  useEffect(() => {
    getDataList(getAllMaterials).catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('Ошибка при получении данных: ', error.message);
      }
    });
  }, [getDataList]);

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
      }}>
      <MaterialTableView />
    </BasicTableProvider>
  );
};
