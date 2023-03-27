import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PagePurchase } from './PagePurchase';

describe('PagePurchase component', () => {
  // Тест проверяет, что компонент PagePurchase отображается с определенными текстами
  test('renders PagePurchase component', () => {
    render(<PagePurchase />);

    // Проверяет, что текст "Закупки" присутствует на странице
    expect(screen.getByText('Закупки')).toBeInTheDocument();
    // Проверяет, что текст "Обновить" присутствует на странице
    expect(screen.getByText('Обновить')).toBeInTheDocument();
    // Проверяет, что текст "Добавить" присутствует на странице
    expect(screen.getByText('Добавить')).toBeInTheDocument();
  });

  // Тест проверяет, что при нажатии на кнопку "Добавить" открывается модальное окно AddModalPurchase
  test('opens AddModalPurchase when clicking the Add button', async () => {
    render(<PagePurchase />);
    fireEvent.click(screen.getByText('Добавить'));

    // Ожидает появления текста "Добавление новой закупки" (текст в модальном окне AddModalPurchase)
    await waitFor(() => screen.getByText('Добавление новой закупки'));
    // Проверяет, что текст "Добавить закупку" присутствует на странице
    expect(screen.getByText('Добавление новой закупки')).toBeInTheDocument();
  });

  // Тест проверяет, что пользователь может вводить текст в поле поиска
  test('search input works', () => {
    render(<PagePurchase />);
    const searchInput = screen.getByPlaceholderText('Поиск по товарам');

    // Вводит текст "test" в поле поиска
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Проверяет, что поле поиска имеет значение "test"
    expect(searchInput).toHaveValue('test');
  });

  // Дополнительные тесты могут быть написаны здесь...
});
