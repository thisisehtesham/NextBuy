import { Suspense } from 'react';
import OrderSuccessContent from './OrderSuccessClient';

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <p className="text-lg text-gray-600">Loading order details...</p>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
