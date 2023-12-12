import { Select, Tooltip } from 'antd';
import { useDataListLoader } from '../../../../hooks';

interface EditableSelectProps {
  options: { id: number; label: string }[];
  onChange: (value: number | null) => void;
  defaultValue?: number;
  isEditable: boolean;
  placeholder: string;
  // fetchDataList: () => Promise<T[]>;
}

export const EditableSelect: React.FC<EditableSelectProps> = ({
  options,
  onChange,
  defaultValue,
  isEditable,
  placeholder,
}) => {
  // Очистить поле select
  const onClear = () => {
    onChange(null);
  };

  // Поиск в select
  const onSearch = (value: string, option: any) => {
    return option.label.toLowerCase().includes(value.toLowerCase());
  };

  if (isEditable) {
    const handleChange = (value: string) => {
      onChange?.(Number(value));
    };

    return (
      <Select
        showSearch
        allowClear
        defaultValue={defaultValue ? String(defaultValue) : undefined}
        style={{ width: 200 }}
        onChange={handleChange}
        onClear={onClear}
        filterOption={onSearch}
        placeholder={placeholder}>
        {' '}
        {options.map(option => (
          <Select.Option
            key={option.id}
            value={String(option.id)}
            label={option.label}>
            <Tooltip placement="right" title={option.label}>
              {option.label}
            </Tooltip>
          </Select.Option>
        ))}
      </Select>
    );
  } else {
    const selectedOption = options.find(option => option.id === defaultValue);
    return <span>{selectedOption ? selectedOption.label : 'Не выбрано'}</span>;
  }
};
