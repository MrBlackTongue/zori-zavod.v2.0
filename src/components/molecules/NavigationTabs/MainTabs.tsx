import React from 'react';
import { Tabs } from 'antd';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ChildTabs } from './ChildTabs';
import { menuKeyToRoutes } from './menuKeyToRoutes';

export const MainTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMainTabChange = (key: string) => {
    const selectedTab = Object.values(menuKeyToRoutes).find(tabs =>
      tabs.some(tab => tab.id === key),
    );
    if (selectedTab) {
      const tab = selectedTab.find(tab => tab.id === key);
      if (tab?.route) {
        navigate(key);
      } else if (tab?.childTabs) {
        navigate(`${key}/${tab.childTabs[0].id}`);
      }
    }
  };

  const mainTabItems = Object.entries(menuKeyToRoutes).map(([key, tabs]) => {
    const tab = tabs[0];
    return {
      key,
      label: tab.title || tab.childTabs?.[0].title,
    };
  });

  return (
    <>
      <Tabs
        className={'main-tabs-style'}
        activeKey={Object.keys(menuKeyToRoutes).find(key =>
          location.pathname.includes(key),
        )}
        onChange={handleMainTabChange}
        items={mainTabItems}
      />
      <Routes>
        {Object.entries(menuKeyToRoutes).map(([key, tabs]) =>
          tabs.map(tab =>
            tab.route ? (
              tab.route
            ) : (
              <Route
                key={key}
                path={`${key}/*`}
                element={
                  <ChildTabs
                    parentTabId={key}
                    childTabs={tab.childTabs || []}
                  />
                }
              />
            ),
          ),
        )}
      </Routes>
    </>
  );
};
