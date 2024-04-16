import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { menuKeyToRoutes } from './menuKeyToRoutes';
import { ChildTabs } from './ChildTabs';

const getActiveTabKeyFromLocalStorage = (): string | undefined =>
  localStorage.getItem('activeTabKey') || undefined;
const setActiveTabKeyToLocalStorage = (key: string) =>
  localStorage.setItem('activeTabKey', key);

interface TabsComponentProps {
  selectedMenuKey: string;
}

export const MainTabs: React.FC<TabsComponentProps> = ({ selectedMenuKey }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabInfoArray = useMemo(
    () => menuKeyToRoutes[selectedMenuKey] || [],
    [selectedMenuKey],
  );

  const [activeTabKey, setActiveTabKey] = useState(() =>
    getActiveTabKeyFromLocalStorage(),
  );

  // Извлекаем все пути дочерних tabs из tabInfoArray
  const childTabPaths = tabInfoArray.flatMap(
    tabInfo =>
      tabInfo.childTabs?.map(childTab => `${tabInfo.id}${childTab.id}`) || [],
  );

  // Проверка, нужно ли показывать дочерние tabs на текущей странице
  const shouldShowChildTabs = childTabPaths.some(path =>
    location.pathname.startsWith(path),
  );

  // Формирование массива объектов для свойства items компонента NavigationTabs
  const tabItems = tabInfoArray.map(tabInfo => ({
    key: tabInfo.id,
    label: (
      <Link
        to={
          tabInfo.childTabs
            ? `${tabInfo.id}${tabInfo.childTabs[0].id}`
            : tabInfo.route?.props?.path || tabInfo.id
        }
        style={{ color: 'inherit' }}>
        {tabInfo.title}
      </Link>
    ),
    children: tabInfo.childTabs ? (
      shouldShowChildTabs ? (
        <ChildTabs parentTabId={tabInfo.id} childTabs={tabInfo.childTabs} />
      ) : null
    ) : (
      <Routes>{tabInfo.route}</Routes>
    ),
  }));

  // Обработчик изменения NavigationTabs
  const handleTabChange = useCallback(
    (key: string) => {
      const selectedTab = tabInfoArray.find(tab => tab.id === key);
      if (selectedTab?.route?.props?.path) {
        navigate(selectedTab.route.props.path);
      } else if (selectedTab?.childTabs) {
        const firstChildTab = selectedTab.childTabs[0];
        const path = `${selectedTab.id}${firstChildTab.id}`;
        navigate(path);
      }
    },
    [navigate, tabInfoArray],
  );

  // useEffect для установки активного ключа tab
  useEffect(() => {
    const savedActiveTabKey = getActiveTabKeyFromLocalStorage();

    // Восстановление активного ключа из localStorage
    let activeTabKeyToSet = savedActiveTabKey || tabInfoArray[0]?.id;

    // Поиск tab, соответствующего текущему пути
    const selectedTab = tabInfoArray.find(
      tab =>
        tab.route?.props.path === location.pathname ||
        tab.childTabs?.some(childTab => {
          const childTabPath = `${tab.id}${childTab.id}`;
          return location.pathname.startsWith(childTabPath);
        }),
    );

    // Установка найденного ключа как активного
    if (selectedTab) {
      activeTabKeyToSet = selectedTab.id;
      setActiveTabKeyToLocalStorage(activeTabKeyToSet);
    }

    setActiveTabKey(activeTabKeyToSet);
  }, [location.pathname, tabInfoArray]);

  return (
    <Tabs
      activeKey={activeTabKey}
      onChange={handleTabChange}
      items={tabItems}
    />
  );
};
