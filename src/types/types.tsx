import {TablePaginationConfig} from "antd/es/table";


export type EmployeeType = {
  firstName: string;
  lastName: string;
  phone: string
  salaryRate: number;
  hired: boolean;
  id: number;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}

export interface EmployeeData {
  firstName: string,
}

export interface AddEmployeeProps {
  open: boolean;
  onCreate: (values: EmployeeType) => void;
  onCancel: () => void;
}