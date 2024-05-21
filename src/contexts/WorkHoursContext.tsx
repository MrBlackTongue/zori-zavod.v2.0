import React, { createContext, ReactNode, useContext } from 'react';
import dayjs from 'dayjs';
import { TypeEditingDayState, TypeTransformedWorkHour } from '../types';

// Определение обобщенных типов для данных контекста
interface WorkHoursContextType {
  isLoading: boolean;
  allData: TypeTransformedWorkHour[];
  editingId: number | null;
  totalHoursPerDay: Record<string, string>;
  totalAllHours: string;
  handleEmployeeChange: (employeeId: number | null) => void;
  handleUpdateRecord: (
    date: TypeTransformedWorkHour,
    newValue: string,
    employeeId: number | null,
  ) => void;
  handleCreateNewRecord: (
    date: TypeTransformedWorkHour,
    newValue: string,
    employeeId: number | null,
  ) => void;
  addNewRow: () => void;
  days: dayjs.Dayjs[];
  handleEditStart: any;
  editingDay: TypeEditingDayState | null;
  calculateTotalHours: (workHour: TypeTransformedWorkHour) => string;
  prevWeek: () => void;
  nextWeek: () => void;
  selectedDate: dayjs.Dayjs;
  goToCurrentWeek: () => void;
  handleDateChange: (date: dayjs.Dayjs | null) => void;
  getWeekFormat: (date: dayjs.Dayjs | null) => string;
  handleDeleteRow: (record: TypeTransformedWorkHour) => void;
  setSearchText: (event: string) => void;
  loadAndUpdateData: () => void;
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
