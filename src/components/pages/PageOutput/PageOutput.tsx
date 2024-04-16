import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { createOutput, deleteOutputById, updateOutput } from '../../../api';
import { TypeOutput, TypeOutputFormValue } from '../../../types';
import { TableOutput } from './components/TableOutput';
import { CreateModalOutput } from './components/CreateModalOutput';
import { UpdateDrawerOutput } from './components/UpdateDrawerOutput';
import dayjs from 'dayjs';
import AddButtonOld from '../../atoms/AddButtonOld/AddButtonOld';

export const PageOutput: React.FC = () => {
  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного выпуска продукции
  const [selectedOutputId, setSelectedOutputId] = useState<number>();

  // Добавить новый выпуск продукции
  const handleCreateOutput = async (
    values: TypeOutputFormValue,
  ): Promise<void> => {
    const output: TypeOutput = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      item: { id: values.item },
    };
    setIsModalOpen(false);
    await createOutput(output);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedOutputId(id);
    setIsDrawerOpen(true);
  };

  // Обновить выпуск продукции
  const handleUpdateOutput = async (
    values: TypeOutputFormValue,
  ): Promise<void> => {
    const output: TypeOutput = {
      id: selectedOutputId,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      item: { id: values.item },
    };
    setIsDrawerOpen(false);
    await updateOutput(output);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteOutput = async (id: number): Promise<void> => {
    await deleteOutputById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div>
      <AddButtonOld setIsModalOpen={setIsModalOpen} />
      <FloatButton.BackTop />
      <TableOutput
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteOutput}
      />
      <CreateModalOutput
        isOpen={isModalOpen}
        createItem={handleCreateOutput}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerOutput
        isOpen={isDrawerOpen}
        selectedItemId={selectedOutputId}
        updateItem={handleUpdateOutput}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
