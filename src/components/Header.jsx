'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();

  if (
    pathname === '/login' ||
    pathname === '/register' ||
    pathname.startsWith('/admin') ||
    pathname === '/admin/login' ||
    pathname === '/admin/orders' ||
    pathname === '/admin/products') {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/products');
  };

  return (
    <header className="bg-slate-900 text-white">
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto px-4">
        
        {/* Logo */}
        <Link href="/" className="text-4xl text-green-600 font-bold">NextBuy</Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 mr-4 text-slate-100 font-bold">
          <Link href="/products">Products</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/orders">Orders</Link>

          {/* Cart with badge */}
          <Link href="/cart">
            <div className="relative">
              cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
                  {cart.length}
                </span>
              )}
            </div>
          </Link>

          {/* Auth Button */}
          {user ? (
            <button onClick={handleLogout} className="text-red-500 hover:underline">
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
