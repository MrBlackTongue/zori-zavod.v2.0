// Определяем тип для информации о сотруднике
export type TypeEmployee = {
  id: number;
  firstName: string;
  hired: boolean;
  lastName: string;
  phone: string;
  salaryRate: number;
};

// Определяем тип для информации о рабочих днях
export type TypeWorkDay = {
  date: string;
  hours: number;
};

// Определяем тип для информации о рабочих часах для конкретного сотрудника
export type TypeEmployeeWorkDays = {
  employee: TypeEmployee;
  days: Record<string, TypeWorkDay>;
};

// Определяем тип для полной структуры данных, которая приходит с бэкэнда
export type TypeApiResponse = {
  weekStartDate: string;
  weekEndDate: string;
  rows: Record<string, TypeEmployeeWorkDays>;
};
