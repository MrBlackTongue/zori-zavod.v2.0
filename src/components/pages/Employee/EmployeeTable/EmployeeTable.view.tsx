import React from 'react';
import { Flex, FloatButton, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TypeEmployee, TypeWithId } from '../../../../types';
import { CustomPopover } from '../../../atoms/CustomPopover/CustomPopover';
import { AddButton } from '../../../atoms/AddButton/AddButton';
import { DeleteWithConfirmationButton } from '../../../atoms/DeleteWithConfirmationButton/DeleteWithConfirmationButton';
import { BasicTable } from '../../../molecules/BasicTable/BasicTable';

export const EmployeeTableView = () => {
  const columns: ColumnsType<TypeWithId<TypeEmployee>> = [
    {
      title: (
        <>
          Фамилия
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                Здесь вы можете увидеть фамилию сотрудника
              </p>
            }
          />
        </>
      ),
      dataIndex: 'lastName',
      key: 'lastName',
      width: 250,
    },
    {
      title: (
        <>
          Имя
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                Здесь вы можете увидеть имя сотрудника
              </p>
            }
          />
        </>
      ),
      dataIndex: 'firstName',
      key: 'firstName',
      width: 250,
    },
    {
      title: (
        <>
          Телефон
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                Здесь вы можете увидеть телефон сотрудника
              </p>
            }
          />
        </>
      ),
      dataIndex: 'phone',
      key: 'phone',
      width: 250,
    },
    {
      title: (
        <>
          Ставка
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                Здесь вы можете увидеть ставку сотрудника в час
              </p>
            }
          />
        </>
      ),
      dataIndex: 'salaryRate',
      key: 'salaryRate',
      width: 250,
    },
    {
      title: (
        <>
          Статус найма
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                Здесь вы можете увидеть статус найма сотрудника
              </p>
            }
          />
        </>
      ),
      dataIndex: 'hired',
      key: 'hired',
      showSorterTooltip: false,
      sorter: (a, b) => Number(a.hired) - Number(b.hired),
      render: hired => (
        <Tag color={hired ? 'green' : 'volcano'}>
          {hired ? 'Работает' : 'Не работает'}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Flex justify="space-between">
        <DeleteWithConfirmationButton />
        <AddButton />
      </Flex>
      <BasicTable columns={columns} />
      <FloatButton.BackTop />
    </div>
  );
};
