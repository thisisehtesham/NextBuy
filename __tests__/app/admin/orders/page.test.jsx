import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminOrdersPage from '@/app/admin/orders/page';

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('AdminOrdersPage', () => {
  it('shows "No orders found" when there are no orders in localStorage', () => {
    localStorage.setItem('orders', JSON.stringify([]));
    render(<AdminOrdersPage />);
    expect(screen.getByText(/no orders found/i)).toBeInTheDocument();
  });

  it('displays orders from localStorage', async () => {
    const orders = [
      {
        id: '123',
        customer: { name: 'John Doe' },
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem('orders', JSON.stringify(orders));

    render(<AdminOrdersPage />);

    expect(await screen.findByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getAllByText(/pending/i)).toHaveLength(2);
    expect(screen.getByText(/123/)).toBeInTheDocument();
  });

  it('updates order status when status button is clicked', async () => {
    const orders = [
      {
        id: '456',
        customer: { name: 'Alice' },
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem('orders', JSON.stringify(orders));
  
    render(<AdminOrdersPage />);
  
    const shippedBtn = await screen.findByRole('button', { name: /shipped/i });
    fireEvent.click(shippedBtn);
  
    await waitFor(() => {
      expect(
        screen.getByText((content, element) =>
          element.tagName.toLowerCase() === 'p' &&
          content.includes('Status:') &&
          element.textContent.toLowerCase().includes('shipped')
        )
      ).toBeInTheDocument();
    });
  
    const updatedOrders = JSON.parse(localStorage.getItem('orders'));
    expect(updatedOrders[0].status).toBe('shipped');
  });
  
});
