import React from 'react';

/*Для таблицы*/

// Функция отображает числовое значение с двумя знаками после запятой 1 055,5
export const renderNumber = (value: number | null) => {
  return value !== null ? (
    <div>
      {value.toLocaleString('ru-RU', {
        maximumFractionDigits: 2, // максимальное количество знаков после запятой
      })}
    </div>
  ) : (
    0
  );
};

// Функция отображает числовое значение в формате валюты с двумя знаками после запятой и символом валюты 1 055,50 ₽
export const renderAsRuble = (value: number | null) => {
  return value !== null ? (
    <div>
      {value.toLocaleString('ru-RU', {
        style: 'currency', // показывает валюту рубли
        currency: 'RUB', // без style не показывает валюту!
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </div>
  ) : null;
};

/*Для формы*/

// Функция меняет в значении точку на запятую
export const numberFormatter = (value: number | undefined): string => {
  if (value === undefined) return '';
  return `${value}`.replace('.', ',');
};

// Функция преобразует значение в число с плавающей точкой
export const numberParser = (displayValue?: string) => {
  if (displayValue === undefined) return 0;
  return parseFloat(displayValue.replace(',', '.'));
};

export function parseFormattedHours(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours + minutes / 60;
}

export function formatHours(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}
