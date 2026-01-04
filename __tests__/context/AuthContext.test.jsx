import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthProvider, useAuth } from '@/context/AuthContext';

// ---- Test component to consume AuthContext
function TestComponent() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <p data-testid="user">{user ? user.name : 'No User'}</p>
      <button onClick={() => login({ name: 'John Doe' })}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initially sets user to null', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('user').textContent).toBe('No User');
  });

  it('sets user on login and stores in localStorage', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    screen.getByText('Login').click();

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('John Doe');
      const stored = localStorage.getItem('userInfo');
      expect(JSON.parse(stored)).toEqual({ name: 'John Doe' });
    });
  });

  it('clears user on logout and removes from localStorage', async () => {
    localStorage.setItem('userInfo', JSON.stringify({ name: 'Jane' }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    screen.getByText('Logout').click();

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('No User');
      expect(localStorage.getItem('userInfo')).toBeNull();
    });
  });
});
