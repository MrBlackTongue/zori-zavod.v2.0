import React, { createContext, useContext, ReactNode } from 'react';
import dayjs from 'dayjs';
import { TransformedWorkHour, TypeEditingDayState } from '../types';

// Определение обобщенных типов для данных контекста
interface WorkHoursContextType {
  isLoading: boolean;
  allWorkHour: TransformedWorkHour[];
  editingEmployee: number | null;
  totalHoursPerDay: Record<string, string>;
  totalAllHours: string;
  handleEmployeeChange: (employeeId: number | null) => void;
  handleUpdateNewRecord: (
    date: TransformedWorkHour,
    newValue: string,
    employeeId: number | null,
  ) => void;
  handleCreateNewRecord: (
    date: TransformedWorkHour,
    newValue: string,
    employeeId: number | null,
  ) => void;
  addNewRow: () => void;
  days: dayjs.Dayjs[];
  handleEditStart: (args: {
    duration: any;
    workDate: string;
    id: number | null | undefined;
    employee: number | null;
  }) => void;
  // allEmployee: TypeEmployee[];
  editingDay: TypeEditingDayState | null;
  calculateTotalHours: (workHour: TransformedWorkHour) => string;
  prevWeek: () => void;
  nextWeek: () => void;
  selectedDate: dayjs.Dayjs;
  goToCurrentWeek: () => void;
  handleDateChange: (date: dayjs.Dayjs | null) => void;
  getWeekFormat: (date: dayjs.Dayjs | null) => string;
  handleUpdateTable: () => void;
}

const WorkHoursContext = createContext<WorkHoursContextType | null>(null);

export const useWorkHoursContext = () => {
  const context = useContext(WorkHoursContext);
  if (!context) {
    throw new Error(
      'useWorkHoursContext must be used within a WorkHoursProvider',
    );
  }
  return context;
};

export const WorkHoursProvider: React.FC<{
  children: ReactNode;
  value: WorkHoursContextType;
}> = ({ children, value }) => (
  <WorkHoursContext.Provider value={value}>
    {children}
  </WorkHoursContext.Provider>
);
