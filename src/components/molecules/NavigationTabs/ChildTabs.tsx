import React from 'react';
import { Tabs } from 'antd';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

interface ChildTabsProps {
  parentTabId: string;
  childTabs: {
    id: string;
    title: string;
    content: React.ReactElement;
  }[];
}

export const ChildTabs: React.FC<ChildTabsProps> = ({
  parentTabId,
  childTabs,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChildTabChange = (key: string) => {
    const selectedTab = childTabs.find(tab => tab.id === key);
    if (selectedTab) {
      const path = `${parentTabId}${selectedTab.id}`;
      navigate(path);
    }
  };

  const tabItems = childTabs.map(tab => ({
    key: tab.id,
    label: tab.title,
  }));

  return (
    <>
      <Tabs
        type={'card'}
        className={'child-tabs-style'}
        activeKey={
          childTabs.find(tab => {
            const childTabPath = `${parentTabId}${tab.id}`;
            return location.pathname.includes(childTabPath);
          })?.id
        }
        onChange={handleChildTabChange}
        items={tabItems}
      />
      <Routes>
        {childTabs.map(tab => (
          <Route
            key={tab.id}
            path={`${parentTabId}${tab.id}`}
            element={tab.content}
          />
        ))}
      </Routes>
    </>
  );
};
