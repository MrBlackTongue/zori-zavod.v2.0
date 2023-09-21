import React, {useEffect, useState} from 'react';
import {Typography, Space, Button, notification} from 'antd';
import '../../App.css';
import {getBalance, getLogin, replenishBalance} from "../../services";
import {Payment} from "../../types";
import {ReplenishBalanceModal} from "./components/ReplenishBalanceModal";

export const PageUserProfile: React.FC = () => {
  const {Title} = Typography;

  // Состояние текущего баланса
  const [balance, setBalance] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');

  // Открыть закрыть модальное окно
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Создать новый платёж
  const handleReplenish = (value: Payment) => {
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
    getLogin()
      .then((data) => {
        setUserName(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  // Отобразить текущий баланс
  useEffect(() => {
    getBalance()
      .then((data) => {
        setBalance(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Личный кабинет</Title>
        <Space></Space>
      </div>
      <p>Учетная запись: {userName}</p>
      <p>Текущий баланс: {balance} Руб</p>
      <Button type="primary" className='pay-button' onClick={() => setIsModalOpen(true)}>
        Пополнить
      </Button>
      <ReplenishBalanceModal
        isOpen={isModalOpen}
        createItem={handleReplenish}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};