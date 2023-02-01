import {TablePaginationConfig} from "antd/es/table";
import React from "react";

export type OperationType = {
  id: number;
  title: string;
  unit: {
    id: number;
    name: string;
  };
  rate: number;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}

export interface OperationsTableProps {
  updateTable: boolean;
  openDrawer: (operationId: number) => void;
}

export interface AddOperationProps {
  isOpen: boolean;
  onCancel: () => void;
  addOperation: (values: OperationType) => void;
}

export interface EditOperationProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedOperationId: number | undefined;
  updateOperation: (values: OperationType) => void,
}