import React, { useState } from 'react';
import { FloatButton } from 'antd';
import {
  createWriteOff,
  deleteWriteOffById,
  updateWriteOff,
} from '../../../api';
import { TypeWriteOff, TypeWriteOffFormValue } from '../../../types';
import { TableWriteOff } from './components/TableWriteOff';
import { CreateModalWriteOff } from './components/CreateModalWriteOff';
import { UpdateDrawerWriteOff } from './components/UpdateDrawerWriteOff';
import { DetailDrawerWriteOff } from './components/DetailDrawerWriteOff';
import AddButtonOld from '../../atoms/AddButtonOld/AddButtonOld';

export const PageWriteOff: React.FC = () => {
  // Обновление таблицы, открыть закрыть модальное окно, drawer, детальный drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState<boolean>(false);

  // id выбранного списания
  const [selectedWriteOffId, setSelectedWriteOffId] = useState<number>();

  // Добавить новое списание
  const handleCreateWriteOff = async (
    values: TypeWriteOffFormValue,
  ): Promise<void> => {
    const writeOff: TypeWriteOff = {
      employee: { id: values.employee },
      productionType: { id: values.productionType },
      description: values.description,
    };
    setIsModalOpen(false);
    await createWriteOff(writeOff);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedWriteOffId(id);
    setIsDrawerOpen(true);
  };

  // Открыть детальный drawer
  const openDetailDrawer = (writeOffId: number): void => {
    setSelectedWriteOffId(writeOffId);
    setIsBottomDrawerOpen(true);
  };

  // Обновить списание
  const handleUpdateWriteOff = async (
    values: TypeWriteOffFormValue,
  ): Promise<void> => {
    const writeOff: TypeWriteOff = {
      id: selectedWriteOffId,
      employee: { id: values.employee },
      productionType: { id: values.productionType },
      description: values.description,
    };
    setIsDrawerOpen(false);
    await updateWriteOff(writeOff);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteWriteOff = async (id: number): Promise<void> => {
    await deleteWriteOffById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div>
      <AddButtonOld setIsModalOpen={setIsModalOpen} />
      <FloatButton.BackTop />
      <TableWriteOff
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteWriteOff}
        openDetailDrawer={openDetailDrawer}
      />
      <CreateModalWriteOff
        isOpen={isModalOpen}
        createItem={handleCreateWriteOff}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerWriteOff
        isOpen={isDrawerOpen}
        selectedItemId={selectedWriteOffId}
        updateItem={handleUpdateWriteOff}
        onCancel={() => setIsDrawerOpen(false)}
      />
      <DetailDrawerWriteOff
        isOpen={isBottomDrawerOpen}
        selectedItemId={selectedWriteOffId}
        onCancel={() => setIsBottomDrawerOpen(false)}
      />
    </div>
  );
};
