import React, {useEffect, useState} from 'react';
import {Typography, Space, Button, notification} from 'antd';
import '../../App.css';
import {getUserSubscription, replenishBalance} from "../../services";
import {TypePayment, TypeSubscription} from "../../types";
import {ReplenishBalanceModal} from "./components/ReplenishBalanceModal";
import {TablePaymentHistory} from "./components/TablePaymentHistory";

export const PageUserProfile: React.FC = () => {
  const {Title} = Typography;

  // Состояние текущего баланса
  const [allData, setAllData] = useState<TypeSubscription>();

  // Обновление таблицы, Открыть закрыть модальное окно
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Создать новый платёж
  const handleReplenish = (value: TypePayment) => {
    setIsModalOpen(false)
    if (value?.sum !== undefined) {
      replenishBalance(value.sum)
        .then(response => {
          if (response) {
            window.location.href = response;
          } else {
            console.error("Не удалось получить URL для перенаправления");
          }
        })
        .catch(error => console.error("Ошибка при пополнении баланса:", error));
    }
  };

  // Отобразить всплывающее окно с сообщением
  useEffect(() => {
    const redirectedDueToUnpaidSubscription = localStorage.getItem('redirectedDueToUnpaidSubscription');
    if (redirectedDueToUnpaidSubscription === 'true') {
      notification.open({
        message: 'Внимание',
        description: 'Вам необходимо оплатить подписку!',
        placement: 'topRight',
        style: {
          marginLeft: '-60vw',
          marginTop: 50
        },
      });
      localStorage.removeItem('redirectedDueToUnpaidSubscription');
    }
  }, []);

  // Отобразить текущий логин и баланс
  useEffect(() => {
    getUserSubscription()
      .then((data) => {
        setAllData(data)
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Личный кабинет</Title>
      </div>
      <p>Учетная запись: {allData?.customer.title}</p>
      <p>Текущий баланс: {allData?.customer.balance} Руб</p>
      <Button type="primary" className='pay-button'  onClick={() => setIsModalOpen(true)}>
        Пополнить
      </Button>
      <Space>
      <TablePaymentHistory
        isUpdateTable
      />
      </Space>
      <ReplenishBalanceModal
        isOpen={isModalOpen}
        createItem={handleReplenish}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};