import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Routes, useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { menuKeyToRoutes } from './menuKeyToRoutes';
import { ChildTabs } from './ChildTabs';

const DEFAULT_TAB_KEY = '0';

const getActiveTabKeyFromLocalStorage = () =>
  localStorage.getItem('activeTabKey');
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

  const [activeTabKey, setActiveTabKey] = useState(
    () => getActiveTabKeyFromLocalStorage() ?? DEFAULT_TAB_KEY,
  );
  // Формирование массива объектов для свойства items компонента NavigationTabs
  const tabItems = tabInfoArray.map(tabInfo => ({
    key: tabInfo.id,
    label: tabInfo.title,
    children: tabInfo.childTabs ? (
      <ChildTabs parentTabId={tabInfo.id} childTabs={tabInfo.childTabs} />
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
    let activeTabKeyToSet = tabInfoArray[0]?.id || DEFAULT_TAB_KEY;

    // Восстановление активного ключа из localStorage
    const savedActiveTabKey = getActiveTabKeyFromLocalStorage();
    if (savedActiveTabKey) {
      activeTabKeyToSet = savedActiveTabKey;
    }

    // Поиск tab, соответствующего текущему пути
    const selectedTab = tabInfoArray.find(
      tab =>
        tab.route?.props.path === location.pathname ||
        tab.childTabs?.some(childTab => {
          const childTabPath = `${tab.id}${childTab.id}`;
          return location.pathname.includes(childTabPath);
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
