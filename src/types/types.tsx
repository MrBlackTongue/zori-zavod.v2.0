import {TablePaginationConfig} from "antd/es/table";
import {EditEmployee} from "../layout/modules/employees/editEmployee";


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

export interface AddEmployeeProps {
  open: boolean;
  onCreate: (values: EmployeeType) => void;
  onCancel: () => void;
}

export interface EditEmployeeProps {
  onCloseDrawer: () => void,
  isDrawerOpen: boolean,
  onFinish: (values: EmployeeType) => void,
  onFinishFailed: () => void,
}

export interface EmployeesTableProps {
  updateTable: boolean;
  refresh: () => void;
}