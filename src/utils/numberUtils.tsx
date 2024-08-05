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

// Функция форматирует минуты в часы
export const formatMinutesToTime = (minutes: number) => {
  if (minutes === null || minutes === undefined) {
    return '';
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}:${mins.toString().padStart(2, '0')}`;
};

// Функция форматирует часы в минуты
export const timeToMinutes = (timeString: string) => {
  // Удаление начальных и конечных пробелов
  const trimmedTimeString = timeString.trim();

  let parts = trimmedTimeString.split(/[:.,/ ]+/);

  if (parts.length === 1) {
    // Если есть только одно число, считаем его часами
    parts = [parts[0], '0'];
  }

  if (parts.length === 2) {
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    if (!isNaN(hours) && !isNaN(minutes)) {
      return hours * 60 + minutes;
    }
  }
  return null; // возвращаем null в случае невалидного ввода
};
