import React, { useState } from 'react';
import { Flex, FloatButton, Input, Select, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TableStock } from './components/TableStock';
import { useFetchAllData } from '../../../hooks';

export const PageStock: React.FC = () => {
  // Хук для получения данных
  const { allCategory } = useFetchAllData({ depsCategory: true });

  // id выбранной группы товаров, Выбранная ячейка остатков
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  // Текст поиска
  const [searchText, setSearchText] = useState<string>('');

  // Изменить выбранную группу товаров
  const onChangeCategory = (value: any): void => {
    setSelectedCategoryId(value || undefined);
  };

  // Поиск по select
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  };

  return (
    <div>
      <Flex
        gap="small"
        justify="flex-end"
        align="center"
        wrap="wrap"
        style={{ marginBottom: 15 }}>
        <Input
          placeholder="Поиск по товарам"
          onChange={event => setSearchText(event.target.value)}
          style={{ width: '210px' }}
          allowClear
          prefix={<SearchOutlined />}
        />
        <Select
          showSearch
          allowClear
          placeholder="Выберите категорию"
          style={{ width: '250px' }}
          onChange={onChangeCategory}
          filterOption={onSearchSelect}>
          {allCategory && allCategory.length > 0
            ? allCategory.map(category => (
                <Select.Option
                  key={category.id}
                  value={category.id}
                  label={category.title}>
                  <Tooltip placement="right" title={category.title}>
                    {category.title}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Flex>
      <FloatButton.BackTop />
      <TableStock searchText={searchText} filter={{ id: selectedCategoryId }} />
    </div>
  );
};
