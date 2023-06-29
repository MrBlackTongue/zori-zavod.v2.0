import React, {useState} from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {PagePurchase} from './PagePurchase';

// Мокаем useState
jest.mock('react', () => ({
  ...jest.requireActual('react'), // Подгружаем оригинальные функции из модуля React
  useState: jest.fn(), // Подменяем useState на мок-функцию
}));

describe('PagePurchase component', () => {
  // Очистка DOM
  beforeEach(() => {
    render(<PagePurchase/>);
  });

  // Тест проверяет, что компонент PagePurchase отображается с определенными текстами
  test('renders PagePurchase component', () => {
    // Проверяет, что текст "Закупки" присутствует на странице
    expect(screen.getByText('Закупки')).toBeInTheDocument();
    // Проверяет, что текст "Обновить" присутствует на странице
    expect(screen.getByText('Обновить')).toBeInTheDocument();
    // Проверяет, что текст "Добавить" присутствует на странице
    expect(screen.getByText('Добавить')).toBeInTheDocument();
  });

  // Тест проверяет, что при нажатии на кнопку "Добавить" открывается модальное окно AddModalPurchase
  test('opens AddModalPurchase when clicking the Add button', async () => {
    fireEvent.click(screen.getByText('Добавить'));

    // Ожидает появления текста "Добавление новой закупки" (текст в модальном окне AddModalPurchase)
    await waitFor(() => screen.getByText('Добавление новой закупки'));
    // Проверяет, что текст "Добавить закупку" присутствует на странице
    expect(screen.getByText('Добавление новой закупки')).toBeInTheDocument();
  });

  // Тест проверяет, что пользователь может вводить текст в поле поиска
  test('search input works', () => {
    const searchInput = screen.getByPlaceholderText('Поиск по товарам');

    // Вводит текст "test" в поле поиска
    fireEvent.change(searchInput, {target: {value: 'test'}});

    // Проверяет, что поле поиска имеет значение "test"
    expect(searchInput).toHaveValue('test');
  });

  // Тест проверяет, что при нажатии на кнопку "Обновить" вызывается соответствующая функция
  test('update button works', () => {
    const setIsUpdateTable = jest.fn();

    // Подменяем вызов useState
    (useState as jest.Mock).mockImplementation(init => [init, setIsUpdateTable]);

    fireEvent.click(screen.getByText('Обновить'));

    // Проверяет, что функция setIsUpdateTable вызывается при нажатии на кнопку "Обновить"
    expect(setIsUpdateTable).toHaveBeenCalled();
  });

  // Дополнительные тесты могут быть написаны здесь...
});