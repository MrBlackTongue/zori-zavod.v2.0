import React, {useState} from "react";
import {Button, Drawer, Space} from "antd";
import {
  DetailDrawerProps,
  TypeWriteOffMovement,
  TypeWriteOffMovementFormValue
} from "../../../types";
import {TableDetailWriteOff} from "./TableDetailWriteOff";
import {PlusOutlined, SyncOutlined} from "@ant-design/icons";
import {
  deleteWriteOffMovementById,
  createWriteOffMovement
} from "../../../services";
import dayjs from "dayjs";
import {CreateModalDetailWriteOff} from "./CreateModalDetailWriteOff";

export const DetailDrawerWriteOff: React.FC<DetailDrawerProps> = ({
                                                                    isOpen,
                                                                    onCancel,
                                                                    selectedItemId,
                                                                  }) => {

  // Обновление таблицы, Открыть закрыть модальное окно
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Функция добавления нового движения товара в списание
  const handleCreateWriteOffMovement = (values: TypeWriteOffMovementFormValue): void => {
    const writeOffMovement: TypeWriteOffMovement = {
      amount: values.amount,
      income: values.income,
      stock: {id: values.stock},
      date: dayjs(values.date).format('YYYY-MM-DD'),
      productBatch: {id: values.productBatch},
      writeOff: {id: selectedItemId},
    };
    setIsModalOpen(false)
    void createWriteOffMovement(writeOffMovement)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteWriteOffMovement = (id: number): void => {
    void deleteWriteOffMovementById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <Drawer
      title="Движение товара"
      placement={"bottom"}
      height={400}
      open={isOpen}
      onClose={onCancel}
      extra={
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </Button>
        </Space>
      }
    >
      <TableDetailWriteOff
        isUpdateTable={isUpdateTable}
        idDetail={selectedItemId}
        onDelete={handleDeleteWriteOffMovement}
      />
      <CreateModalDetailWriteOff
        isOpen={isModalOpen}
        createItem={handleCreateWriteOffMovement}
        onCancel={() => setIsModalOpen(false)}
      />
    </Drawer>
  );
}