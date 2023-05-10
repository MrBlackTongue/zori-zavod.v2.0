import React, { useState, useEffect } from 'react';
import { Tree, Button, Space, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {getAllProductGroup, deleteProductGroupById, getChildrenProductGroup} from '../../../services';
import { TypeProductGroup } from '../../../types';

interface ProductGroupTreeProps {
  isUpdateTable: boolean;
  openDrawer: (productGroupId: number) => void;
}

export const TableProductGroup: React.FC<ProductGroupTreeProps> = ({ isUpdateTable, openDrawer }) => {
  const { TreeNode } = Tree;

  const [productGroups, setProductGroups] = useState<TypeProductGroup[]>([]);

  const getChildrenRecursively = async (group: TypeProductGroup): Promise<TypeProductGroup> => {
    const children = await getChildrenProductGroup(group.id!);
    const childNodes = await Promise.all(children.map(child => getChildrenRecursively(child)));
    return { ...group, children: childNodes };
  };

  useEffect(() => {
    const fetchProductGroups = async () => {
      const rootProductGroups = await getAllProductGroup();
      const productGroupsWithChildren = await Promise.all(
        rootProductGroups.map(group => getChildrenRecursively(group))
      );
      setProductGroups(productGroupsWithChildren);
    };

    fetchProductGroups();
  }, [isUpdateTable]);

  useEffect(() => {
    getAllProductGroup().then(setProductGroups);
  }, [isUpdateTable]);

  const renderTreeNodes = (data: TypeProductGroup[]): React.ReactNode =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id?.toString() || 'unknown'}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={
            <Space>
              {item.title}
              <Tooltip title="Редактировать">
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => openDrawer(item.id!)}
                  style={{ padding: 0 }}
                />
              </Tooltip>
              {/* Rest of the code */}
            </Space>
          }
          key={item.id?.toString() || 'unknown'}
        />
      );
    });

  return (
    <Tree showLine defaultExpandedKeys={productGroups.map(group => group.id?.toString() || 'unknown')}>
    {renderTreeNodes(productGroups)}
    </Tree>
  );
};

export default TableProductGroup;