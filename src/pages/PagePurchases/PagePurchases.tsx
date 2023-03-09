import React, { useState, useEffect } from 'react';
import { Typography, Space, Button, Form } from 'antd';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import '../../App.css';
import './PagePurchases.css';
import { postNewPurchase, putChangePurchase } from '../../services';
import { PurchaseType } from '../../types';
import { AddModalPurchase, TablePurchases, EditDrawerPurchase } from '../../components';
import moment from 'moment';

const { Title } = Typography;

const PagePurchases: React.FC = () => {
    
    const [form] = Form.useForm();
    
    const [loading, setLoading] = useState(false);
    const [updateButton, setUpdateButton] = useState('Обновить');
    
    const [updateTable, setUpdateTable] = useState(false);
    
    const [purchase, setPurchase] = useState<PurchaseType | null>(null);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    const [selectedPurchaseId, setSelectedPurchaseId] = useState<number>();

    const addPurchase = (values: { [key: string]: any }): PurchaseType => {
        const purchase: PurchaseType = {
            amount: values.amount,
            cost: values.cost,
            date: moment(values.date),
            product: {
                id: values.product,
            },
            paid: values.paid,
        };
        setIsModalOpen(false);
        postNewPurchase(purchase);
        setUpdateTable(!updateTable);
        return purchase;
    };

    useEffect(() => {
        if (purchase) {
            form.setFieldsValue(purchase);
        }
    }, [purchase, form]);

    const openDrawer = (purchaseId: number) => {
        setSelectedPurchaseId(purchaseId);
        setIsDrawerOpen(true);
    };

    const updatePurchase = (values: { [key: string]: any }): PurchaseType => {
        const purchase: PurchaseType = {
            id: selectedPurchaseId,
            amount: values.amount,
            cost: values.cost,
            date: moment(values.date),
            product: values.product,
            paid: values.paid,
        };
        setIsDrawerOpen(false);
        putChangePurchase(purchase);
        setUpdateTable(!updateTable);
        return purchase;
    };

    return (
        <div style={{ display: 'grid' }}>
            <div className="centerTitle">
                <Title level={3}>Закупки</Title>
                <Space>
                    <Button
                        type="dashed"
                        icon={<SyncOutlined spin={loading} />}
                        onClick={() => setUpdateTable(!updateTable)}
                        className="greenButton"
                    >
                        {updateButton}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Добавить
                    </Button>
                </Space>
            </div>
            <TablePurchases updateTable={updateTable} openDrawer={openDrawer} />
            <AddModalPurchase
                isOpen={isModalOpen}
                addItem={addPurchase}
                onCancel={() => setIsModalOpen(false)}
            />
            <EditDrawerPurchase
                isOpen={isDrawerOpen}
                selectedItemId={selectedPurchaseId}
                updateItem={updatePurchase}
                closeDrawer={() => setIsDrawerOpen(false)}
            />
        </div>
    );
};

export default PagePurchases;
