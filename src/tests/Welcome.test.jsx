import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Welcome from '../components/Welcome';

// fase di montaggio
describe('mounting phase', () => {
  it('appears in the page', () => {
    render(<Welcome />);
    const h1 = screen.getByText(/benvenuti in epibooks!/i);
    expect(h1).toBeInTheDocument();
  });
});
