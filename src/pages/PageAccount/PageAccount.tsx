import React, {useEffect, useState} from 'react';
import { Typography, Space, Button } from 'antd';
import '../../App.css';
import {getBalance, getLogin, replenishBalance} from "../../services";
import {Payment} from "../../types";
import {CreateModalAccount} from "./components/CreateModalAccount";

export const PageAccount: React.FC = () => {
  const { Title } = Typography;
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState<string>('');

  // Открыть закрыть модальное окно
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //текущий логин
  useEffect(() => {
    getLogin()
      .then((data) => {
        setUserName(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  useEffect(() => {
    getBalance()
      .then((data) => {
        setBalance(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  // Создать новый платёж
  const handleReplenish = (value: Payment) => {
    setIsModalOpen(false)
    if (value?.sum !== undefined) {
      replenishBalance(value.sum)
        .then(response => {
          console.log("Ответ сервера:", response);
          if (response.confirmation && response.confirmation.confirmation_url) {
            window.location.href = response.confirmation.confirmation_url;
          } else {
            console.error("Не удалось получить URL для перенаправления.");
          }
        })
        .catch(error => console.error("Ошибка при пополнении баланса:", error));
    }
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className='centerTitle'>
        <Title level={3}>Личный кабинет</Title>
        <Space></Space>
      </div>
      <p>Учетная запись: {userName}</p>
      <p>Текущий баланс: {balance} Руб</p>
      <Button type="primary" className='Pay-button' onClick={() => setIsModalOpen(true)}>
        Пополнить
      </Button>
      <CreateModalAccount
      isOpen={isModalOpen}
      createItem={handleReplenish}
      onCancel={() => setIsModalOpen(false)}
    />
    </div>
  );
};
