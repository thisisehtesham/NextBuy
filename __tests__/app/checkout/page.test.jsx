import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutPage from '@/app/checkout/page';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

// ---- Mock useCart
vi.mock('@/context/CartContext', () => ({
  useCart: vi.fn(),
}));

// ---- Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('CheckoutPage', () => {
  const mockClearCart = vi.fn();
  const mockPush = vi.fn();

  const cartMock = [
    {
      id: 1,
      name: 'Sample Item',
      qty: 2,
      price: 100,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useCart.mockReturnValue({
      cart: cartMock,
      clearCart: mockClearCart,
    });
    useRouter.mockReturnValue({
      push: mockPush,
    });
    localStorage.clear();
  });

  it('renders checkout form and order summary', () => {
    render(<CheckoutPage />);
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/shipping address/i)).toBeInTheDocument();
    expect(screen.getByText(/sample item x 2/i)).toBeInTheDocument();
    expect(screen.getByText(/total: ₹200.00/i)).toBeInTheDocument();
  });

  it('submits the form and stores order in localStorage', () => {
    render(<CheckoutPage />);

    fireEvent.change(screen.getByPlaceholderText(/full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/shipping address/i), {
      target: { value: '123 Street' },
    });

    fireEvent.click(screen.getByRole('button', { name: /place order/i }));

    const orders = JSON.parse(localStorage.getItem('orders'));
    expect(orders).toHaveLength(1);
    expect(orders[0].customer.name).toBe('John Doe');
    expect(mockClearCart).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/\/order-success\?id=/));
  });
});
