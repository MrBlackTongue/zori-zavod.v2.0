import React, {useMemo, useState} from 'react';
import {Typography, Space, Button, FloatButton, DatePicker, Input, Select} from 'antd';
import {SearchOutlined, SyncOutlined} from "@ant-design/icons";
import '../../App.css'
import dayjs from "dayjs";

export const PageProductReport: React.FC = () => {

    const {Title} = Typography;
    const {Option} = Select;

    // Обновление таблицы
    const [isUpdateTable, setIsUpdateTable] = useState(false);

    //Выбранные даты
    const [selectedDateFrom, setSelectedDateFrom] = useState<string | undefined>();
    const [selectedDateTo, setSelectedDateTo] = useState<string | undefined>();

    // id выбраного товара
    const [selectedProductId, setSelectedProductId] = useState<number>();

    // Создание объекта фильтра с использованием useMemo
    const filter = useMemo(() => ({
        dateFrom: selectedDateFrom,
        dateTo: selectedDateTo,
        product: selectedProductId,

    }), [selectedDateFrom, selectedDateTo]);

    // Поиск по селекту
    const onSearchSelect = (searchText: string, option: any) => {
        return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
    }

    // Изменить выбранную дату
    const onChangeDateFrom = (value: any): void => {
        setSelectedDateFrom(value ? dayjs(value).format('YYYY-MM-DD') : undefined);
    }
    const onChangeDateTo = (value: any): void => {
        setSelectedDateTo(value ? dayjs(value).format('YYYY-MM-DD') : undefined);
    }

    // Изменить выбранный тип производства
    const onChangeProduct = (value: any): void => {
        setSelectedProductId(value ? value : undefined);
    };


    return (
        <div style={{display: 'grid'}}>
            <div className='centerTitle'>
                <Title level={3}>Отчет по товарам</Title>
                <Space>
                    <Input
                        allowClear
                        style={{width: '210px'}}
                        placeholder="Поиск по товарам"
                        onChange={onChangeProduct}
                        // filterOption={onSearchSelect}
                        prefix={<SearchOutlined/>}
                    />
                    <DatePicker
                        placeholder='Дата от'
                        style={{width: '150px'}}
                        format='DD.MM.YYYY'
                        onChange={onChangeDateFrom}
                    />
                    <DatePicker
                        placeholder='Дата до'
                        style={{width: '150px'}}
                        format='DD.MM.YYYY'
                        onChange={onChangeDateTo}
                    />
                    <Button
                        type="dashed"
                        icon={<SyncOutlined/>}
                        onClick={() => setIsUpdateTable(prevState => !prevState)}
                        className='greenButton'
                    >
                        Обновить
                    </Button>
                </Space>
            </div>
            <FloatButton.BackTop/>
            {/*<TableOperationReport*/}
            {/*    isUpdateTable={isUpdateTable}*/}
            {/*    filter={filter}*/}
            {/*/>*/}
        </div>
    );
};
