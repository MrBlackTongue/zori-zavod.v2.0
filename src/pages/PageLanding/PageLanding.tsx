import React, {useState} from 'react';
import {Button, Space, Card, Row, Col, Dropdown, Menu} from 'antd';
import {MenuOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {CreateModalRegistrationUser} from "./components/CreateModalRegistrationUser";
import './/PageLanding.css';
import {TypeUserProfile} from "../../types";
import {registrationUser} from "../../services";

export const PageLanding = () => {

    const navigate = useNavigate();

    // Открыть закрыть модальное окно
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Создать нового пользователя
    const handleCreateNewUser = (values: TypeUserProfile): void => {
        const user: TypeUserProfile = {
            username: 'admin',
            password: values.password,
            email: values.email,
            phone: values.phone,
            firstname: values.firstname,
        }
        setIsModalOpen(false)
        void registrationUser(user)
    }

    // Переход на другую страницу по адресу
    const handleLogin = () => {
        navigate('/login');
    };

    const menu = (
        <Menu className='dropdown-menu'>
            <Menu.Item key="1" onClick={handleLogin} className='dropdown-button-menu'>
                Войти
            </Menu.Item>
            <Menu.Item
                key="2"
                onClick={() => setIsModalOpen(true)}
                className='dropdown-button-menu'>
                Регистрация
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='page-landing flex column center-column'>
            <div className='header flex row center-row'>
                <img src="/images/header_logo.png" alt="Logo" className='logo'/>
                <Space>
                    <Dropdown overlay={menu} className='dropdown-button-menu'>
                        <Button type="primary">
                            <MenuOutlined/>
                        </Button>
                    </Dropdown>
                </Space>
                {/*<Space>*/}
                {/*    <Button type="default" className='button-login text-bold' onClick={handleLogin}>Войти</Button>*/}
                {/*    <Button type="primary" className='button-registration text-bold' onClick={handleLogin}>Регистрация</Button>*/}
                {/*</Space>*/}
            </div>
            <div className='block-one flex center-column center-row'>
                <div className='text-block column'>
                    <div className='title-one text-bold'>Производство, склад, ERP в облаке</div>
                    <p className='text'>
                        Все что нужно — в одном месте: учет операций, закупки, склад, клиенты, отгрузки и отчеты.
                    </p>
                    <Space>
                        <Button type="primary" className='button-start text-bold' onClick={() => setIsModalOpen(false)}>
                            Начать работу
                        </Button>
                    </Space>
                </div>
                <img src="/images/main_image.png" alt="web-app"
                     className='jumbotron-one flex column center-row center-column'/>
            </div>
            <div className='block-two flex row center-row center-column'>
                <img src="/images/image_one.png" alt="factoryApp"
                     className='jumbotron-block center-row center-column'/>
                <div className='block-column flex column center-column center-row'>
                    <div className='title-mini center-text text-bold'>Идеально подойдёт малым производствам</div>
                    <div className='text-block-two center-text'>
                        <p>
                            Zolotenkov полезен всем,
                            кто управляет производством. Никаких сложных настроек или загадочных процедур.
                            15 минут - и у вас есть ваша персонализированная ERP-система
                            для производственной деятельности.
                        </p>
                    </div>
                </div>
                <img src="/images/image_two.png" alt="people_working" className='jumbotron-block2'/>
            </div>
            <div className='block-three flex column center-column'>
                <div className='block-group flex row center-row space-around'>
                    <img src="/images/group_accounting.png" alt="accounting"
                         className='jumbotron-two flex column center-row center-column'/>
                    <div className='text-block'>
                        <div className='title-group text-bold'>Учёт операций</div>
                        <p className='text-group'>
                            Отслеживайте операции, результаты,
                            время выполнения и затраченные ресурсы - все в одной мощной и простой в использовании
                            системе.
                            Повышайте эффективность и контролируйте производственные процессы.
                        </p>
                    </div>
                </div>
                <div className='block-group block-group-two flex row center-row space-around'>
                    <div className='text-block'>
                        <div className='title-group text-bold'>Управление закупками</div>
                        <p className='text-group'>
                            Контролируйте все ваши заказы: от количества и цены до даты поставки.
                            Мы также предлагаем функционал для приемки товаров,
                            помогающий вам без проблем учитывать все закупленные товары.
                        </p>
                    </div>
                    <img src="/images/group_procurement.png" alt="Procurement_management"
                         className='jumbotron-two flex column center-row center-column'/>
                </div>
                <div className='block-group flex row center-row space-around'>
                    <img src="/images/group_warehouse.png" alt="warehouse_management"
                         className='jumbotron-two flex column center-row center-column'/>
                    <div className='text-block'>
                        <div className='title-group text-bold'>Ведение склада</div>
                        <p className='text-group'>
                            Легко создавайте товары и добавляйте их на склад,
                            учитывайте количество товаров и списывайте их со склада.
                            Благодаря интеграции с производственными операциями,
                            отгрузками и приемками товаров,
                            вы всегда будете в курсе актуального баланса на вашем складе.
                        </p>
                    </div>
                </div>
            </div>
            <div className='block-four flex column center-column center-row'>
                <div className='title-two center-text text-bold'>Оптимизируйте ваше производство</div>
                <p className='text-two center-text'>
                    Мы предлагаем вашей команде всестороннее решение для эффективного управления ресурсами
                    и контроля над процессами производства.
                </p>
                <div className='card-grid'>
                    <Row gutter={[30, 30]} justify="center" align="top">
                        <Col span={7} xs={24} sm={12} md={8} lg={7}>
                            <Card bordered={false} className='card'>
                                <img alt="tap" src="/images/card_tap.png" className="card-image"/>
                                <div className='card-title text-bold'>Простота в управлении</div>
                                Мы создали доступный и удобный интерфейс,
                                обеспечивающий быстрое освоение и комфортную работу
                                с нашей системой учета производственных операций.
                            </Card>
                        </Col>
                        <Col span={7} xs={24} sm={12} md={8} lg={7}>
                            <Card bordered={false} className='card'>
                                <img alt="earth" src="/images/card_international.png" className="card-image"/>
                                <div className='card-title text-bold'>Проводите учет где угодно</div>
                                С нашей системой вы сможете управлять производством,
                                не зависимо от географии, сохраняя полный контроль над каждой деталью.
                            </Card>
                        </Col>
                        <Col span={7} xs={24} sm={12} md={8} lg={7}>
                            <Card bordered={false} className='card'>
                                <img alt="file2" src="/images/card_document.png" className="card-image"/>
                                <div className='card-title text-bold'>Отчёты в реальном времени</div>
                                Автоматизированные отчеты отображают детали ваших производственных операций.
                                Идеальный инструмент для оптимизации процессов и координации команды.
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='block-five flex row center-row space-around'>
                <img alt="meeting" src="/images/meeting.png" className="image-container"/>
                <div className='block-column flex column center-column center-row'>
                    <div className='title-mini text-bold center-text'>
                        Попробуйте Zolotenkov прямо сейчас!
                    </div>
                    <Space>
                        <Button type="primary" className='button-start text-bold' onClick={() => setIsModalOpen(false)}>
                            Бесплатная версия
                        </Button>
                    </Space>
                </div>
                <img alt="transactions" src="/images/transactions.png" className="image-container2"/>
            </div>
            <div className='footer flex column center-row center-column'>
                <p className='footer-text-one'>Телефон: +7 (968) 614-15-72</p>
                <p className='footer-text-two'>Связаться с нами:</p>
                <a href="https://t.me/AlAlon369" target='_blank' rel="noopener noreferrer">
                    <img alt="icon-telegram" src="/images/footer_icon_telegram.png" className="logo-telegram"/>
                </a>
                <p className='footer-text-three'>© Zolotenkov 2022-2023</p>
            </div>
            <CreateModalRegistrationUser
                isOpen={isModalOpen}
                createItem={handleCreateNewUser}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
};