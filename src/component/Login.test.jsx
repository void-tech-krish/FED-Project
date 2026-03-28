import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from './Login';

describe('Login Component', () => {
  it('renders correctly and toggles between user and admin roles', () => {
    // Render the component
    render(<Login onLogin={vi.fn()} />);

    // Verify User Role is default
    expect(screen.getByRole('button', { name: /Login as User/i })).toBeInTheDocument();

    // Switch to Admin Role
    fireEvent.click(screen.getByRole('button', { name: /Admin Login/i }));
    
    // Verify Admin Role took effect
    expect(screen.getByRole('button', { name: /Login as Admin/i })).toBeInTheDocument();
  });

  it('shows error messages on invalid submit', () => {
    render(<Login onLogin={vi.fn()} />);

    // Click submit without entering data
    fireEvent.click(screen.getByRole('button', { name: /Login as User/i }));

    // Expect generic errors to be rendered
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
  });
});
