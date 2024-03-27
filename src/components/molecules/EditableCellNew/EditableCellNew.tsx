import React, { useState } from 'react';
import { Input } from 'antd';

interface EditableCellNewProps {
  value: string;
  row: {
    id?: string | number | undefined;
  };
  column: {
    id: string;
  };
  updateData: (
    rowId: string | number,
    columnId: string | number,
    value: string,
  ) => void;
}

export const EditableCellNew: React.FC<EditableCellNewProps> = ({
  value: initialValue,
  row: { id },
  column: { id: dataIndex },
  updateData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    if (typeof id !== 'undefined' && typeof dataIndex !== 'undefined') {
      updateData(id, dataIndex, value);
    } else {
      console.error('ID строки или ID колонки не определены');
    }
  };

  return (
    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={'editable-cell-value-wrap'}
    />
  );
};
