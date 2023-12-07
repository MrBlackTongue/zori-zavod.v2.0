import { Select } from 'antd';

interface EditableSelectProps {
  options: { id: number; name: string }[];
  onChange: (value: number) => void;
  defaultValue?: number;
  isEditable: boolean;
  placeholder: string;
}

export const EditableSelect: React.FC<EditableSelectProps> = ({
  options,
  onChange,
  defaultValue,
  isEditable,
  placeholder,
}) => {
  if (isEditable) {
    const handleChange = (value: string) => {
      onChange?.(Number(value));
    };

    return (
      <Select
        defaultValue={defaultValue ? String(defaultValue) : undefined}
        style={{ width: 200 }}
        onChange={handleChange}
        placeholder={placeholder}>
        {' '}
        {options.map(option => (
          <Select.Option key={option.id} value={String(option.id)}>
            {option.name}
          </Select.Option>
        ))}
      </Select>
    );
  } else {
    const selectedOption = options.find(option => option.id === defaultValue);
    return <span>{selectedOption ? selectedOption.name : 'Не выбрано'}</span>;
  }
};
