import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';

afterEach(cleanup);

it('uses native button activation and exposes the current theme', () => {
  const onToggle = vi.fn();
  const { rerender } = render(<ThemeToggle onToggle={onToggle} theme="dark" />);
  const toggle = screen.getByRole('switch', { name: 'Switch to light theme' });
  expect(toggle.tagName).toBe('BUTTON');
  expect(toggle).toHaveAttribute('type', 'button');
  expect(toggle).toHaveAttribute('aria-checked', 'true');
  fireEvent.click(toggle);
  expect(onToggle).toHaveBeenCalledOnce();
  rerender(<ThemeToggle onToggle={onToggle} theme="light" />);
  expect(toggle).toHaveAttribute('aria-checked', 'false');
});
