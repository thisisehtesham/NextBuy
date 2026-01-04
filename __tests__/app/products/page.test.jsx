import { render, screen, fireEvent } from '@testing-library/react';
import Products from '@/app/products/page';
import * as productLib from '@/lib/products';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

// ---- Mock product data
const mockProducts = [
  {
    id: 1,
    title: 'Blue Shirt',
    category: 'fashion',
    price: 999,
    description: 'Stylish blue shirt',
    image: '/shirt.jpg',
  },
  {
    id: 2,
    title: 'Gold Ring',
    category: 'jewelery',
    price: 4999,
    description: '18k gold ring',
    image: '/ring.jpg',
  },
];

describe('Products page', () => {
  beforeEach(() => {
    vi.spyOn(productLib, 'getAllProducts').mockReturnValue(mockProducts);
  });

  it('renders products from getAllProducts()', () => {
    render(<Products />);
    expect(screen.getByText('Blue Shirt')).toBeInTheDocument();
    expect(screen.getByText('Gold Ring')).toBeInTheDocument();
  });

  it('filters products by search text', () => {
    render(<Products />);
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'ring' },
    });
    expect(screen.queryByText('Gold Ring')).toBeInTheDocument();
    expect(screen.queryByText('Blue Shirt')).not.toBeInTheDocument();
  });

  it('filters products by category', () => {
    render(<Products />);
    fireEvent.change(screen.getByDisplayValue('All Categories'), {
      target: { value: 'fashion' },
    });
    expect(screen.getByText('Blue Shirt')).toBeInTheDocument();
    expect(screen.queryByText('Gold Ring')).not.toBeInTheDocument();
  });

  it('filters by min and max price', () => {
    render(<Products />);
    fireEvent.change(screen.getByPlaceholderText('Min Price'), {
      target: { value: '1000' },
    });
    fireEvent.change(screen.getByPlaceholderText('Max Price'), {
      target: { value: '5000' },
    });
    expect(screen.queryByText('Blue Shirt')).not.toBeInTheDocument();
    expect(screen.getByText('Gold Ring')).toBeInTheDocument();
  });
});
