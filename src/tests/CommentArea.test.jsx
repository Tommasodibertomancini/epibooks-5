import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CommentArea from '../components/CommentArea';

describe('mounting phase CommentArea', () => {
  it('shows correctly', () => {
    render(<CommentArea />);
    const commentAreaDiv = screen.getByTestId('commentAreaId');
    expect(commentAreaDiv).toBeInTheDocument();
  });
});