import React, { useEffect, useState } from 'react';
import { Button, notification, Space, Typography } from 'antd';
import '../../App.css';
import '../PageSubscription/PageSubscription.css';
import { getUserSubscription, replenishBalance } from '../../services';
import { TypePaymentFormValue, TypeSubscription } from '../../types';
import { ReplenishBalanceModal } from './components/ReplenishBalanceModal';
import { TablePaymentHistory } from './components/TablePaymentHistory';
import dayjs from 'dayjs';

export const PageSubscription: React.FC = () => {
  const { Title } = Typography;

  // Информация о подписке
  const [subscriptionInfo, setSubscriptionInfo] = useState<TypeSubscription>();

  // Открыть закрыть модальное окно
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Создать новый платёж
  const handleReplenish = (value: TypePaymentFormValue) => {
    setIsModalOpen(false);
    replenishBalance(value.amount)
      .then(response => {
        if (response) {
          window.location.href = response;
        } else {
          console.error('Не удалось получить URL для перенаправления');
        }
      })
      .catch(error => console.error('Ошибка при пополнении баланса:', error));
  };

  // Отобразить всплывающее окно с сообщением
  useEffect(() => {
    const redirectedDueToUnpaidSubscription = localStorage.getItem(
      'redirectedDueToUnpaidSubscription',
    );
    if (redirectedDueToUnpaidSubscription === 'true') {
      notification.open({
        message: 'Внимание',
        description: 'Вам необходимо оплатить подписку!',
        placement: 'topRight',
        style: {
          marginLeft: '-60vw',
          marginTop: 50,
        },
        type: 'warning',
      });
      localStorage.removeItem('redirectedDueToUnpaidSubscription');
    }
  }, []);

  // Получить информацию о подписке пользователя
  useEffect(() => {
    getUserSubscription()
      .then(data => setSubscriptionInfo(data))
      .catch(error => {
        console.log('Error: ', error);
      });
  }, []);

  return (
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Подписка</Title>
      </div>
      <div className="subscription-row">
        <Space className="subscription-column ">
          <p>
            <strong>Учетная запись:</strong> {subscriptionInfo?.customer.email}
          </p>
          <p>
            <strong>Дата окончания подписки:</strong>
            {dayjs(subscriptionInfo?.endDate).format(' DD.MM.YYYY')}
          </p>
          <p>
            <strong>Тариф:</strong> {subscriptionInfo?.plan.price} руб/сут.
          </p>
        </Space>
        <Space className="subscription-column subscription-block">
          <Title level={5}>
            Ваш текущий баланс: {subscriptionInfo?.customer.balance} Руб
          </Title>
          <Button
            type="primary"
            className="pay-button"
            onClick={() => setIsModalOpen(true)}>
            Пополнить
          </Button>
        </Space>
      </div>

      <TablePaymentHistory />
      <ReplenishBalanceModal
        isOpen={isModalOpen}
        createItem={handleReplenish}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
