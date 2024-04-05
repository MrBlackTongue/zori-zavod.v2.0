import React from 'react';
import { Spin } from 'antd';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  tip?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  tip = 'Загрузка',
}) => {
  return (
    <div className="page-form-style spinner-container">
      <Spin tip={tip} size="large">
        <div className="spinner-content" />
      </Spin>
    </div>
  );
};
