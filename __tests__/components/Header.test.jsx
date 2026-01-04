import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from '@/components/Header';

// ---- Mock useRouter and usePathname
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/products', // default path
}));

// ---- Mock CartContext
vi.mock('@/context/CartContext', () => ({
  useCart: () => ({ cart: [{ id: 1 }, { id: 2 }] }),
}));

// ---- Mock AuthContext
const logoutMock = vi.fn();
vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ user: { name: 'John' }, logout: logoutMock }),
}));

describe('Header component', () => {
  beforeEach(() => {
    logoutMock.mockClear();
  });

  it('renders header with logo and navigation', () => {
    render(<Header />);
    expect(screen.getByText('NextBuy')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('cart')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logout and redirects on Logout click', () => {
    render(<Header />);
    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);
    expect(logoutMock).toHaveBeenCalled();
  });
});
