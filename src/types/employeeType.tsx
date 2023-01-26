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

export interface EmployeesTableProps {
  updateTable: boolean;
  openDrawer: (employeeId: number) => void;
}

export interface AddEmployeeProps {
  isOpen: boolean;
  onCreate: (values: EmployeeType) => void;
  onCancel: () => void;
}

export interface EditEmployeeProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedEmployeeId: number | undefined;
  onChange: (values: EmployeeType) => void,
}