import React from 'react';
import { Flex, Radio } from 'antd';
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
    <Flex className={'radio-button-group'}>
      <Radio.Group
        value={value}
        optionType="button"
        buttonStyle="solid"
        onChange={e => onChange(e.target.value)}>
        {options.map(option => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </Flex>
  );
};
