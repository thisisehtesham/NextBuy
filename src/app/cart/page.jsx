'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="w-screen h-[calc(100vh-80px)] flex flex-col gap-6 justify-center items-center">
        <h1 className="font-semibold text-xl">Your Cart is Empty!</h1>
        <Link href="/">
          <button className="bg-[#16a34a] text-white text-md uppercase font-semibold py-3 px-10 rounded-md
          border-[#16a34a] border-2 hover:bg-white hover:text-[#16a34a] transition-all duration-300 ease-in">
            Shop Now
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-16 max-w-6xl p-6 mx-auto flex-wrap lg:flex-nowrap">
      
      {/* Cart Items Section */}
      <div className="lg:w-[70%] w-full">
        {cart.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-6 items-center border-b py-4"
          >
            <Image
              src={item.image}
              alt={item.title || product.name}
              width={80}
              height={80}
              className="w-20 h-20 object-contain rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.title || item.name}</h2>
              <p className="w-40 text-gray-500 font-normal text-[12px]">
                {item.description?.split(' ').slice(0, 10).join(' ') + '...'}
              </p>
              <p className="text-green-600 font-semibold text-md">₹{item.price} × {item.qty}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 font-semibold hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="md:w-[30%] w-full flex flex-col gap-8 justify-between">
        <div className="mt-20">
          <p className="text-xl text-[#166534] uppercase font-semibold">Your Cart</p>
          <p className="text-5xl font-semibold text-[#15803d] uppercase mb-4">Summary</p>
          <p className="text-slate-700 text-xl font-semibold">
            Total Items: <span className="font-normal">{cart.length}</span>
          </p>
        </div>

        <div className="mb-20">
          <p className="text-slate-700 text-xl font-semibold mb-5">
            Total Amount:
            <span className="font-bold ml-2 text-black">₹{totalAmount.toFixed(2)}</span>
          </p>
          <Link href="/checkout">
            <button className="text-lg w-full py-2.5 rounded-lg font-bold text-white bg-[#15803d]
              border-2 border-[#15803d] hover:bg-white hover:text-[#15803d] transition-all duration-300 ease-in">
              Checkout Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
