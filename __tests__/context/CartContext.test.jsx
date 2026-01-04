import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from '@/context/CartContext';

// ---- Test consumer component
function TestCartComponent() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <p data-testid="cart-length">{cart.length}</p>
      <button onClick={() => addToCart({ id: 1, name: 'Item 1' })}>Add Item</button>
      <button onClick={() => removeFromCart(1)}>Remove Item</button>
      <button onClick={clearCart}>Clear Cart</button>
      {cart.map((item) => (
        <div key={item.id} data-testid={`item-${item.id}`}>
          {item.name} x {item.qty}
        </div>
      ))}
    </div>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initially sets cart to empty', () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
  });

  it('adds item to cart and stores it in localStorage', async () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Item'));

    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('1');
      expect(screen.getByTestId('item-1')).toHaveTextContent('Item 1 x 1');

      const stored = JSON.parse(localStorage.getItem('cart'));
      expect(stored[0].id).toBe(1);
    });
  });

  it('increments quantity if same item added again', async () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Add Item'));

    await waitFor(() => {
      expect(screen.getByTestId('item-1')).toHaveTextContent('x 2');
    });
  });

  it('removes item from cart', async () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Remove Item'));

    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('0');
    });
  });

  it('clears the entire cart', async () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Clear Cart'));

    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('0');
      expect(localStorage.getItem('cart')).toBe('[]');
    });
  });
});
