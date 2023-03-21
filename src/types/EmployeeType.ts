
export type EmployeeTypes = {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string
  salaryRate: number;
  hired: boolean;
}

export interface EmployeesTableProps {
  updateTable: boolean;
  openDrawer: (employeeId: number) => void;
}

export interface AddEmployeeProps {
  isOpen: boolean;
  onCancel: () => void;
  addEmployee: (values: EmployeeTypes) => void;
}

export interface EditEmployeeProps {
  isOpen: boolean,
  closeDrawer: () => void,
  selectedEmployeeId: number | undefined;
  updateEmployee: (values: EmployeeTypes) => void,
}