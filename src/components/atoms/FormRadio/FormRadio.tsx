import React from 'react';
import { Flex, Radio, Space } from 'antd';
import './FormRadio.css';

interface FormRadioProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const FormRadio: React.FC<FormRadioProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <Flex align={'center'} className={'radio-button-flex'}>
      <Radio.Group
        value={value}
        optionType="button"
        buttonStyle="solid"
        className={'radio-button-group'}
        onChange={e => onChange(e.target.value)}>
        <Space>
          {options.map(option => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Flex>
  );
};
