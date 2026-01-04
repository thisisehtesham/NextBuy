'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin/login');
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  const hideSidebar = pathname === '/admin/login';

  return (
    <div className="min-h-screen flex bg-gray-50">
      {!hideSidebar && (
        <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between shadow-lg">
          <div>
            <h2 className="text-2xl font-extrabold mb-6 text-green-600 tracking-wide">
              Admin Panel
            </h2>
            <nav className="flex flex-col space-y-4 text-lg">
              <a
                href="/admin/orders"
                className="block px-3 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Orders
              </a>
              <a
                href="/admin/products"
                className="block px-3 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Products
              </a>
            </nav>
          </div>
          <button
            onClick={logout}
            className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </aside>
      )}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
