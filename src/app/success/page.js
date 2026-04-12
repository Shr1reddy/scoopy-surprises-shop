'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('scoopyLastOrder');
      if (saved) setOrderData(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen confetti-bg flex flex-col items-center justify-center px-4 py-12">
      {/* Success card */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Top banner */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 px-6 py-8 text-center text-white">
          <div className="text-6xl mb-3 animate-bounce">🎉</div>
          <h1 className="text-2xl font-extrabold">Order Confirmed!</h1>
          <p className="text-pink-100 text-sm mt-1">Thank you for choosing Scoopy Surprises 💕</p>
          {orderData?.paymentId && (
            <p className="text-pink-200 text-xs mt-2 font-mono bg-white/10 rounded-full px-3 py-1 inline-block">
              Payment ID: {orderData.paymentId}
            </p>
          )}
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* What happens next */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <h2 className="font-bold text-green-700 text-sm mb-2">What happens next? 📦</h2>
            <ul className="space-y-1.5 text-sm text-green-600">
              <li className="flex items-start gap-2">
                <span>✅</span>
                <span>We've received your order and will start packing your surprise!</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📱</span>
                <span>Our team will contact you on +91 {orderData?.phone || 'your number'} for delivery confirmation.</span>
              </li>
              {orderData?.includeVideo && (
                <li className="flex items-start gap-2">
                  <span>🎥</span>
                  <span>Your unboxing video will be captured and shared with you!</span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <span>🚚</span>
                <span>Estimated delivery: 3–5 working days.</span>
              </li>
            </ul>
          </div>

          {/* Order summary (if available) */}
          {orderData && (
            <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 text-sm">
              <h2 className="font-bold text-pink-600 mb-2">Your Order Summary</h2>
              <div className="space-y-1 text-gray-600">
                <p><span className="text-gray-400">Name: </span>{orderData.name}</p>
                <p><span className="text-gray-400">Scoop: </span>{orderData.scoop}</p>
                <p><span className="text-gray-400">Packaging: </span>{orderData.packing}</p>
                <p><span className="text-gray-400">Video: </span>{orderData.includeVideo ? 'Yes 🎥' : 'No'}</p>
                <p className="font-bold text-pink-600 pt-1 border-t border-pink-200 mt-1">
                  Total Paid: ₹{orderData.total}
                </p>
              </div>
            </div>
          )}

          {/* Contact */}
          <div className="text-center text-sm text-gray-500">
            <p>Questions? We're here for you!</p>
            <a
              href="https://wa.me/919246249339?text=Hi!%20I%20have%20a%20question%20about%20my%20Scoopy%20Surprises%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 bg-green-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-600 transition-all"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.093 1.508 5.813L0 24l6.334-1.482A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.021-1.38l-.36-.213-3.754.878.9-3.664-.235-.376A9.818 9.818 0 1 1 12 21.818z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          <Link
            href="/"
            className="block text-center text-pink-500 text-sm font-medium hover:text-pink-700 transition-all"
          >
            ← Place another order
          </Link>
        </div>
      </div>
    </div>
  );
}
