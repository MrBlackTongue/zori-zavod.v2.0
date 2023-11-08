import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { createUnit, deleteUnitById, updateUnit } from '../../services';
import { TypeUnit, TypeUnitFormValue } from '../../types';
import { TableUnit } from './components/TableUnit';
import { CreateModalUnit } from './components/CreateModalUnit';
import { UpdateDrawerUnit } from './components/UpdateDrawerUnit';
import AddButton from '../../components/AddButton/AddButton';

export const PageUnit: React.FC = () => {
  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранной единицы измерения
  const [selectedUnitId, setSelectedUnitId] = useState<number>();

  // Добавить новую единицу измерения
  const handleCreateUnit = async (values: TypeUnitFormValue): Promise<void> => {
    const unit: TypeUnit = {
      name: values.name,
    };
    setIsModalOpen(false);
    await createUnit(unit);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedUnitId(id);
    setIsDrawerOpen(true);
  };

  // Обновить единицу измерения
  const handleUpdateUnit = async (values: TypeUnitFormValue): Promise<void> => {
    const unit: TypeUnit = {
      id: selectedUnitId,
      name: values.name,
    };
    setIsDrawerOpen(false);
    await updateUnit(unit);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteUnit = async (id: number): Promise<void> => {
    await deleteUnitById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div>
      <AddButton setIsModalOpen={setIsModalOpen} />
      <FloatButton.BackTop />
      <TableUnit
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteUnit}
      />
      <CreateModalUnit
        isOpen={isModalOpen}
        createItem={handleCreateUnit}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerUnit
        isOpen={isDrawerOpen}
        selectedItemId={selectedUnitId}
        updateItem={handleUpdateUnit}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
