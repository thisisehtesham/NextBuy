import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminProductsPage from '@/app/admin/products/page';

// ---- Mock localStorage
beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe('AdminProductsPage', () => {
  it('shows "No products available" when localStorage is empty', () => {
    localStorage.setItem('products', JSON.stringify([]));
    render(<AdminProductsPage />);
    expect(screen.getByText(/no products available/i)).toBeInTheDocument();
  });

  it('renders products from localStorage', async () => {
    const products = [
      { id: '1', name: 'Test Product 1', price: 100 },
      { id: '2', name: 'Test Product 2', price: 200 },
    ];
    localStorage.setItem('products', JSON.stringify(products));

    render(<AdminProductsPage />);

    expect(await screen.findByText(/test product 1/i)).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText(/test product 2/i)).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
  });

  it('deletes a product and updates localStorage', async () => {
    const products = [
      { id: '1', name: 'Product A', price: 150 },
      { id: '2', name: 'Product B', price: 250 },
    ];
    localStorage.setItem('products', JSON.stringify(products));

    render(<AdminProductsPage />);

    const deleteButtons = await screen.findAllByText(/delete/i);
    fireEvent.click(deleteButtons[0]); // delete Product A

    await waitFor(() => {
      expect(screen.queryByText(/product a/i)).not.toBeInTheDocument();
      expect(screen.getByText(/product b/i)).toBeInTheDocument();
    });

    const updated = JSON.parse(localStorage.getItem('products'));
    expect(updated).toHaveLength(1);
    expect(updated[0].name).toBe('Product B');
  });
});
