import React from 'react';
import { Flex } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './FormHeader.css';

interface FormHeaderProps {
  header: string;
  title: string | undefined;
  isSaving: boolean;
  onCancel: () => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  header,
  title,
  isSaving,
  onCancel,
}) => (
  <Flex justify="space-between" className={'form-header'}>
    <div>
      {header}
      <div className={'form-title'}>{title}</div>
    </div>
    <Flex align="center">
      <div style={{ marginRight: 10, color: isSaving ? 'tomato' : '#949a9e' }}>
        {isSaving ? 'сохранение...' : 'все изменения сохранены'}
      </div>
      <CloseOutlined onClick={onCancel} className={'close-icon-hover'} />
    </Flex>
  </Flex>
);
