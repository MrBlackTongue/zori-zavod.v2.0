import React, {useEffect, useState} from 'react';
import {Typography, Space, Button, notification} from 'antd';
import '../../App.css';
import {getUserInfo, replenishBalance} from "../../services";
import {TypePayment} from "../../types";
import {ReplenishBalanceModal} from "./components/ReplenishBalanceModal";
import {TableUserProfile} from "./components/TableUserProfile";

export const PageUserProfile: React.FC = () => {
  const {Title} = Typography;

  // Состояние текущего баланса
  const [balance, setBalance] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable] = useState<boolean>(false);
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

  // Отобразить текущий логин
  useEffect(() => {
    getUserInfo()
      .then((data) => {
        setUserName(data.customer.title);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  // Отобразить текущий баланс
  useEffect(() => {
    getUserInfo()
      .then((data) => {
        setBalance(data.customer.balance);
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
      <p>Учетная запись: {userName}</p>
      <p>Текущий баланс: {balance} Руб</p>
      <Button type="primary" className='pay-button'  onClick={() => setIsModalOpen(true)}>
        Пополнить
      </Button>
      <Space>
      <TableUserProfile
        isUpdateTable={isUpdateTable}
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