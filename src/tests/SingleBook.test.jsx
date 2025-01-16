import { render, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';
import booksList from '../data/fantasy.json';

describe('user interaction', () => {
  it('shows red border when clicked', () => {
    render(<App />);
    const books = screen.getAllByTestId('singleBookElement');

    const randomBookIndex = Math.floor(Math.random() * booksList.length + 1);

    fireEvent.click(books[randomBookIndex]);

    expect(books[randomBookIndex].style.border).toBe('3px solid red');
  });

  it('red border disappears when a second book is clicked', () => {
    render(<App />);
    const books = screen.getAllByTestId('singleBookElement');

    const randomFirstBookIndex = Math.floor(
      Math.random() * booksList.length + 1
    );
    const randomSecondBookIndex = Math.floor(
      Math.random() * booksList.length + 1
    );

    fireEvent.click(books[randomFirstBookIndex]);
    fireEvent.click(books[randomSecondBookIndex]);
    expect(books[randomFirstBookIndex].style.border).toBe('');
  });
});
