import {TablePaginationConfig} from "antd/es/table";

export type EmployeeType = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string
  salaryRate: number;
  hired: boolean;
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
  onCancel: () => void;
  addEmployee: (values: EmployeeType) => void;
}

export interface EditEmployeeProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedEmployeeId: number | undefined;
  updateEmployee: (values: EmployeeType) => void,
}