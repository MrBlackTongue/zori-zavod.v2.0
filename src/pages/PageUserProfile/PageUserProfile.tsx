import React, {useEffect, useState} from 'react';
import {Typography, Space, Button, notification} from 'antd';
import '../../App.css';
import {getUserSubscription, replenishBalance} from "../../services";
import {TypePaymentFormValue, TypeSubscription} from "../../types";
import {ReplenishBalanceModal} from "./components/ReplenishBalanceModal";
import {TablePaymentHistory} from "./components/TablePaymentHistory";
import dayjs from "dayjs";

export const PageUserProfile: React.FC = () => {
  const {Title} = Typography;

  // Информация о подписке
  const [subscriptionInfo, setSubscriptionInfo] = useState<TypeSubscription>();

  // Открыть закрыть модальное окно
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Создать новый платёж
  const handleReplenish = (value: TypePaymentFormValue) => {
    setIsModalOpen(false)
    replenishBalance(value.amount)
      .then(response => {
        if (response) {
          window.location.href = response;
        } else {
          console.error("Не удалось получить URL для перенаправления");
        }
      })
      .catch(error => console.error("Ошибка при пополнении баланса:", error));
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

  // Получить информацию о подписке пользователя
  useEffect(() => {
    getUserSubscription()
      .then((data) => setSubscriptionInfo(data))
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Личный кабинет</Title>
      </div>
      <p>Учетная запись: {subscriptionInfo?.customer.email}</p>
      <p>Дата окончания подписки:
          {subscriptionInfo?.endDate ? dayjs(subscriptionInfo.endDate).format(' DD.MM.YYYY') : " Дата не установлена"}
      </p>
      <p>Текущий баланс: {subscriptionInfo?.customer.balance} Руб</p>
      <Button type="primary" className='pay-button' onClick={() => setIsModalOpen(true)}>
        Пополнить
      </Button>
      <Space>
        <TablePaymentHistory/>
      </Space>
      <ReplenishBalanceModal
        isOpen={isModalOpen}
        createItem={handleReplenish}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};