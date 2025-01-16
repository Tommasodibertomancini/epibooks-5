import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';
import booksList from '../data/fantasy.json'

describe('mounting phase', () => {
  it('no Comment in page onload', () => {
    render(<App />);
    const singleCommentInstances = screen.queryAllByTestId('singleComment');
    console.log(singleCommentInstances.length);

    expect(singleCommentInstances).toHaveLength(0);
  });
});

describe('user interaction ', () => {
  it('comments appears in page after click on a book that have almost one comment', async () => {
    render(<App />);

    const books = screen.getAllByTestId('singleBookElement');

    let singleCommentInstances = [];
    let randomIndex;

    while (singleCommentInstances.length === 0) {
      randomIndex = Math.floor(Math.random() * booksList.length + 1);
      fireEvent.click(books[randomIndex]);

      try {
        singleCommentInstances = await screen.findAllByTestId(
          'singleCommentText'
        );
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        singleCommentInstances = [];
      }
    }

    expect(singleCommentInstances[0]).toBeInTheDocument();
  });
});