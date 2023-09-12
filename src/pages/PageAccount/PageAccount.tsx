import React, {useEffect, useState} from 'react';
import { Typography, Space, Button } from 'antd';
import '../../App.css';
import {getBalance, registrationUser, replenishBalance} from "../../services";
import {CreateModalRegistrationUser} from "../PageLanding/components/CreateModalRegistrationUser";
import {TypeAccount, TypeUserProfile} from "../../types";
import {CreateModalAccount} from "./components/CreateModalAccount";

export const PageAccount: React.FC = () => {
  const { Title } = Typography;
  const [balance, setBalance] = useState(0);

  // Сумма для пополнения
  const [amountToReplenish, setAmountToReplenish] = useState(0);

  // Открыть закрыть модальное окно
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //текущий баланс
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
  const handleCreateNewPayment = (values: TypeAccount): void => {
    // const payment: TypeUserProfile = {
    //   payment: values.payment,
    // }
    // setIsModalOpen(false)
    // void replenishBalance(payment)
  }

  // const replenishBalance = () => {
  //   const amountToReplenish = 10; // или получите это значение из состояния/формы
  //   replenishBalance(amountToReplenish)
  //     .then((newBalance) => setBalance(newBalance))  // Предположим, что новый баланс возвращается в ответе
  //     .catch((error) => console.error("Ошибка при пополнении баланса: ", error));
  // };

  return (
    <div style={{ display: 'grid' }}>
      <div className='centerTitle'>
        <Title level={3}>Личный кабинет</Title>
        <Space></Space>
      </div>
      <p>Текущий баланс: {balance} Руб</p>
      <Button type="primary" className='Pay-button' onClick={() => setIsModalOpen(true)}>
        Пополнить
      </Button>
      <CreateModalAccount
      isOpen={isModalOpen}
       createItem={handleCreateNewPayment}
      onCancel={() => setIsModalOpen(false)}
    />
    </div>
  );
};
