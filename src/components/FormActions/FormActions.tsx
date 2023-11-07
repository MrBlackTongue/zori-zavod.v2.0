import React from 'react';
import { Button, Form, Space } from 'antd';

interface FormActionsProps {
  onCancel?: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel }) => (
  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Space>
      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
      <Button onClick={onCancel}>Отмена</Button>
    </Space>
  </Form.Item>
);

export default FormActions;
