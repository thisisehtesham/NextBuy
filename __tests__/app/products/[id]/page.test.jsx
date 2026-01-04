import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductDetail from '@/app/products/[id]/page';

// ---- Mock useCart
const addToCartMock = vi.fn();
vi.mock('@/context/CartContext', () => ({
  useCart: () => ({ addToCart: addToCartMock }),
}));

// ---- Mock getAllProducts
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 999,
  description: 'Test Description',
  image: '/test.jpg',
};
vi.mock('@/lib/products', () => ({
  getAllProducts: () => [mockProduct],
}));

// ---- Mock use(params)
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    use: (params) => params,
  };
});

// ---- Mock Image for test environment
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

describe('ProductDetail Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('reviews', JSON.stringify({ 1: [] }));
  });

  it('renders product details correctly', () => {
    render(<ProductDetail params={{ id: '1' }} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('₹999')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('calls addToCart when button is clicked', () => {
    render(<ProductDetail params={{ id: '1' }} />);
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(addToCartMock).toHaveBeenCalledWith(mockProduct);
  });

  it('shows "No reviews yet" when there are no reviews', () => {
    render(<ProductDetail params={{ id: '1' }} />);
    expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
  });

  it('shows error if review form is submitted with empty name', () => {
    window.alert = vi.fn();
    render(<ProductDetail params={{ id: '1' }} />);

    fireEvent.change(screen.getByPlaceholderText('Your Comment'), {
      target: { value: 'Nice product' },
    });
    fireEvent.click(screen.getByText('Submit Review'));

    expect(window.alert).toHaveBeenCalledWith('Name and comment are required.');
  });
});
