import React, { useEffect } from 'react';
import { Routes, useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { menuKeyToRoutes } from './menuKeyToRoutes';

const { TabPane } = Tabs;

interface TabsComponentProps {
  selectedMenuKey: string;
}

export const TabsComponent: React.FC<TabsComponentProps> = ({
  selectedMenuKey,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabInfoArray = menuKeyToRoutes[selectedMenuKey] || [];

  const handleTabChange = (key: string) => {
    const newTabPath = tabInfoArray[parseInt(key, 10)]?.route?.props?.path;
    if (newTabPath) {
      navigate(newTabPath);
    }
  };

  useEffect(() => {
    const firstTabPath = tabInfoArray[0]?.route?.props?.path;
    if (firstTabPath && location.pathname !== firstTabPath) {
      navigate(firstTabPath);
    }
  }, [selectedMenuKey]);

  return (
    <Tabs type="card" onChange={handleTabChange}>
      {tabInfoArray.map((tabInfo, index) => (
        <TabPane tab={tabInfo.title} key={index.toString()}>
          <Routes>{tabInfo.route}</Routes>
        </TabPane>
      ))}
    </Tabs>
  );
};
