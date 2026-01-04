import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '@/app/cart/page';
import { useCart } from '@/context/CartContext';
import { vi } from 'vitest';

// ---- Mock Next.js <Image /> and <Link/> 
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

// ---- Mock useCart
vi.mock('@/context/CartContext', () => ({
  useCart: vi.fn(),
}));

describe('CartPage', () => {
  it('renders empty cart message when cart is empty', () => {
    useCart.mockReturnValue({ cart: [], removeFromCart: vi.fn() });
    render(<CartPage />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/shop now/i)).toBeInTheDocument();
  });

  it('renders cart items and total summary', () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: 'Sample Product',
          price: 500,
          qty: 2,
          description: 'A sample product for testing',
          image: '/sample.jpg',
        },
      ],
      removeFromCart: vi.fn(),
    });

    render(<CartPage />);
    expect(screen.getByRole('heading', { name: /sample product/i })).toBeInTheDocument();
    expect(screen.getByText(/₹500 × 2/)).toBeInTheDocument();
    expect(screen.getByText(/total amount/i)).toBeInTheDocument();
    expect(screen.getByText(/₹1000.00/)).toBeInTheDocument();
    expect(screen.getByText(/checkout now/i)).toBeInTheDocument();
  });

  it('calls removeFromCart when Remove button is clicked', () => {
    const mockRemove = vi.fn();
    useCart.mockReturnValue({
      cart: [
        {
          id: 2,
          title: 'Delete Me',
          price: 200,
          qty: 1,
          description: 'Item to delete',
          image: '/deleteme.jpg',
        },
      ],
      removeFromCart: mockRemove,
    });

    render(<CartPage />);
    fireEvent.click(screen.getByText(/remove/i));
    expect(mockRemove).toHaveBeenCalledWith(2);
  });
});
