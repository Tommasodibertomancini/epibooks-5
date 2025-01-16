import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';
import bookList from '../data/fantasy.json';

describe('mounting phase', () => {
  it('all books from data file are showed', () => {
    render(<App />);
    const bookInJSON = bookList.length;
    const books = screen.queryAllByTestId('singleBookItem');
    expect(books).toHaveLength(bookInJSON);
  });

  it('searchBar appears correctly', () => {
    render(<App />);
    const searchBar = screen.getByPlaceholderText(/cerca un libro/i);
    expect(searchBar).toBeInTheDocument();
  });
});

describe('user interaction phase', () => {
  it('books filtered by "sword" word are more than 0', () => {
    render(<App />);
    const searchBar = screen.getByPlaceholderText(/cerca un libro/i);
    fireEvent.change(searchBar, { target: { value: 'sword' } });
    const books = screen.queryAllByTestId('singleBookItem');
    expect(books.length).toBeGreaterThan(0);
  });

  it('no books showed when "harry" is used as filter', () => {
    render(<App />);
    const searchBar = screen.getByPlaceholderText(/cerca un libro/i);
    fireEvent.change(searchBar, { target: { value: 'harry' } });
    const books = screen.queryAllByTestId('singleBookItem');
    expect(books).toHaveLength(0);
  });
});