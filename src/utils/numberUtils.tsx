/*Для таблицы*/

// Функция отображает числовое значение с двумя знаками после запятой 1 055,5
export const renderNumber = (value: number | null | undefined) => {
  return (value ?? 0).toLocaleString('ru-RU', {
    maximumFractionDigits: 2, // максимальное количество знаков после запятой
  });
};

// Функция отображает числовое значение в формате валюты с двумя знаками после запятой и символом валюты 1 055,50 ₽
export const renderAsRuble = (value: number | null | undefined) => {
  return (value ?? 0).toLocaleString('ru-RU', {
    style: 'currency', // показывает валюту рубли
    currency: 'RUB', // без style не показывает валюту!
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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
