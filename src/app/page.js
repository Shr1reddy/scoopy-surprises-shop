'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

// ─── Pricing data ────────────────────────────────────────────────────────────

const SCOOP_TYPES = [
  {
    id: 'mini',
    name: 'Mini Scoop',
    price: 299,
    emoji: '🍦',
    tagline: 'A sweet little surprise',
    items: '3–4 curated items',
    ideal: 'Great for small gestures',
  },
  {
    id: 'regular',
    name: 'Regular Scoop',
    price: 599,
    emoji: '🍨',
    tagline: 'Our crowd favourite!',
    items: '6–7 curated items',
    ideal: 'Perfect for birthdays & celebrations',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium Scoop',
    price: 999,
    emoji: '🎁',
    tagline: 'The ultimate surprise box',
    items: '10–12 curated items',
    ideal: 'Extra special occasions',
  },
];

const PACKING_TYPES = [
  {
    id: 'normal',
    name: 'Normal Packing',
    price: 149,
    emoji: '🎀',
    description: 'Eco-friendly wrap with a cute bow',
  },
  {
    id: 'box',
    name: 'Box Packaging',
    price: 199,
    emoji: '📦',
    description: 'Premium gift box with tissue paper & ribbon',
  },
];

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepBar({ step }) {
  const labels = ['Scoop', 'Packing', 'Details', 'Review'];
  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      <div className="flex items-center">
        {labels.map((label, i) => {
          const s = i + 1;
          const done = step > s;
          const active = step === s;
          return (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                    ${done ? 'bg-green-400 text-white' : active ? 'bg-pink-500 text-white shadow-md shadow-pink-200' : 'bg-gray-100 text-gray-400'}`}
                >
                  {done ? '✓' : s}
                </div>
                <span className={`text-xs mt-1 font-medium ${active ? 'text-pink-600' : done ? 'text-green-500' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
              {s < 4 && (
                <div className={`flex-1 h-1 mx-2 mb-4 rounded transition-all duration-500 ${step > s ? 'bg-green-400' : 'bg-gray-100'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 1: Scoop selection ──────────────────────────────────────────────────

function Step1({ order, setOrder, errors }) {
  return (
    <div className="step-container space-y-4">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-rose-400 to-fuchsia-400 p-6 text-white shadow-xl">
        <div className="relative z-10">
          <p className="text-pink-100 text-sm font-medium uppercase tracking-wider mb-1">Welcome to</p>
          <h1 className="text-3xl font-extrabold mb-1">Scoopy Surprises 🍦</h1>
          <p className="text-pink-100 text-sm leading-relaxed">
            Curated surprise gift boxes for the women & little ones you love. Each scoop is packed with joy, picked just for them!
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['✏️ Cute Stationery', '💎 Kids Jewellery', '🎨 DIY Painting', '💇 Hair Essentials'].map((tag) => (
              <span key={tag} className="bg-white/20 backdrop-blur text-white text-xs rounded-full px-3 py-1 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
        <div className="absolute -bottom-8 -right-2 w-20 h-20 bg-white/10 rounded-full" />
      </div>

      {/* Guide text */}
      <div className="flex items-start gap-3 bg-pink-50 border border-pink-200 rounded-2xl px-4 py-3">
        <span className="text-2xl">👋</span>
        <p className="text-sm text-pink-700 font-medium">
          Let's build your perfect gift! Start by choosing a scoop size below — then we'll customise the rest step by step.
        </p>
      </div>

      <h2 className="text-base font-bold text-gray-700">Choose Your Scoop Size</h2>

      <div className="space-y-3">
        {SCOOP_TYPES.map((scoop) => {
          const selected = order.scoopType === scoop.id;
          return (
            <button
              key={scoop.id}
              onClick={() => setOrder((o) => ({ ...o, scoopType: scoop.id }))}
              className={`relative w-full p-4 rounded-2xl border-2 text-left transition-all duration-200
                ${selected ? 'border-pink-500 bg-pink-50 shadow-lg shadow-pink-100' : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-sm'}`}
            >
              {scoop.popular && (
                <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold animate-bounce-soft">
                  ⭐ Most Popular
                </span>
              )}
              <div className="flex items-center gap-4 pr-24">
                <span className="text-4xl">{scoop.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800 text-base">{scoop.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5 italic">{scoop.tagline}</div>
                  <div className="text-xs text-pink-500 mt-1 font-medium">📦 {scoop.items}</div>
                  <div className="text-xs text-gray-400">{scoop.ideal}</div>
                </div>
              </div>
              <div className="absolute right-4 bottom-4 text-right">
                <div className={`text-2xl font-extrabold ${selected ? 'text-pink-600' : 'text-gray-700'}`}>
                  ₹{scoop.price}
                </div>
                {selected && <div className="text-green-500 text-xs font-semibold">✓ Selected</div>}
              </div>
            </button>
          );
        })}
      </div>

      {errors.scoopType && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2">
          ⚠️ {errors.scoopType}
        </p>
      )}
    </div>
  );
}

// ─── Step 2: Packing + Video ──────────────────────────────────────────────────

function Step2({ order, setOrder, errors }) {
  return (
    <div className="step-container space-y-4">
      <h2 className="text-base font-bold text-gray-700">Choose Your Packaging 🎁</h2>

      <div className="space-y-3">
        {PACKING_TYPES.map((packing) => {
          const selected = order.packingType === packing.id;
          return (
            <button
              key={packing.id}
              onClick={() => setOrder((o) => ({ ...o, packingType: packing.id }))}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200
                ${selected ? 'border-pink-500 bg-pink-50 shadow-lg shadow-pink-100' : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-sm'}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{packing.emoji}</span>
                <div className="flex-1">
                  <div className="font-bold text-gray-800">{packing.name}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{packing.description}</div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-extrabold ${selected ? 'text-pink-600' : 'text-gray-700'}`}>
                    ₹{packing.price}
                  </div>
                  {selected && <div className="text-green-500 text-xs font-semibold">✓ Selected</div>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {errors.packingType && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2">
          ⚠️ {errors.packingType}
        </p>
      )}

      {/* Video add-on */}
      <div className="mt-2 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-2xl p-5 border border-purple-200">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">🎬</span>
          <div>
            <h3 className="font-bold text-gray-700">Want a Surprise Video?</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              We'll record the unboxing moment & share the video straight to you — a memory to keep forever!
            </p>
            <p className="text-xs text-purple-500 font-semibold mt-1">Only +₹50 extra</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setOrder((o) => ({ ...o, includeVideo: true }))}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200
              ${order.includeVideo ? 'border-purple-500 bg-purple-500 text-white shadow-md' : 'border-purple-300 text-purple-600 hover:bg-purple-50'}`}
          >
            🎥 Yes, add video! (+₹50)
          </button>
          <button
            onClick={() => setOrder((o) => ({ ...o, includeVideo: false }))}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200
              ${!order.includeVideo ? 'border-gray-400 bg-gray-100 text-gray-700' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}
          >
            No, thanks
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Customer details ─────────────────────────────────────────────────

function Step3({ order, setOrder, errors }) {
  return (
    <div className="step-container space-y-4">
      <h2 className="text-base font-bold text-gray-700">Your Details 📝</h2>
      <p className="text-sm text-gray-500">Tell us where to deliver this surprise!</p>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1.5">
            Full Name <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            value={order.name}
            onChange={(e) => setOrder((o) => ({ ...o, name: e.target.value }))}
            placeholder="Recipient's full name"
            className={`w-full border-2 rounded-xl px-4 py-3 text-sm transition-all
              ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-400'}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1.5">
            Age <span className="text-pink-500">*</span>
          </label>
          <input
            type="number"
            value={order.age}
            onChange={(e) => setOrder((o) => ({ ...o, age: e.target.value }))}
            placeholder="e.g. 8 or 25"
            min="1"
            max="100"
            className={`w-full border-2 rounded-xl px-4 py-3 text-sm transition-all
              ${errors.age ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-400'}`}
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1.5">
            Delivery Address <span className="text-pink-500">*</span>
          </label>
          <textarea
            value={order.address}
            onChange={(e) => setOrder((o) => ({ ...o, address: e.target.value }))}
            placeholder="House/flat no., street, city, state — with PIN code"
            rows={3}
            className={`w-full border-2 rounded-xl px-4 py-3 text-sm transition-all resize-none
              ${errors.address ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-400'}`}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1.5">
            Phone Number <span className="text-pink-500">*</span>
          </label>
          <div className="flex gap-2">
            <span className="flex items-center px-3 border-2 border-gray-200 rounded-xl text-sm text-gray-500 bg-gray-50 font-medium">
              🇮🇳 +91
            </span>
            <input
              type="tel"
              value={order.phone}
              onChange={(e) =>
                setOrder((o) => ({ ...o, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))
              }
              placeholder="10-digit mobile number"
              className={`flex-1 border-2 rounded-xl px-4 py-3 text-sm transition-all
                ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-400'}`}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Special instructions */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1.5">
            Special Instructions{' '}
            <span className="text-gray-400 font-normal text-xs">(optional)</span>
          </label>
          <textarea
            value={order.specialInstructions}
            onChange={(e) => setOrder((o) => ({ ...o, specialInstructions: e.target.value }))}
            placeholder="E.g. Please add a birthday card, preferred colour: purple, avoid pink, etc."
            rows={3}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-pink-400 transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: Order review ─────────────────────────────────────────────────────

function Step4({ order, scoop, packing, scoopPrice, packingPrice, videoPrice, total }) {
  return (
    <div className="step-container space-y-4">
      <h2 className="text-base font-bold text-gray-700">Review Your Order 🛍️</h2>

      {/* What you get */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
        <h3 className="font-semibold text-gray-600 text-sm mb-3 pb-2 border-b border-pink-100">Your Selections</h3>
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Scoop</span>
            <span className="font-semibold text-gray-800">
              {scoop?.emoji} {scoop?.name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Packaging</span>
            <span className="font-semibold text-gray-800">
              {packing?.emoji} {packing?.name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Video Capture</span>
            <span className={`font-semibold ${order.includeVideo ? 'text-purple-600' : 'text-gray-400'}`}>
              {order.includeVideo ? '🎥 Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery details */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
        <h3 className="font-semibold text-gray-600 text-sm mb-3 pb-2 border-b border-pink-100">Delivery Details</h3>
        <div className="space-y-1.5 text-sm">
          <p>
            <span className="text-gray-400">Name: </span>
            <span className="font-medium text-gray-800">{order.name}</span>
          </p>
          <p>
            <span className="text-gray-400">Age: </span>
            <span className="font-medium text-gray-800">{order.age}</span>
          </p>
          <p>
            <span className="text-gray-400">Phone: </span>
            <span className="font-medium text-gray-800">+91 {order.phone}</span>
          </p>
          <p>
            <span className="text-gray-400">Address: </span>
            <span className="font-medium text-gray-800">{order.address}</span>
          </p>
          {order.specialInstructions && (
            <p>
              <span className="text-gray-400">Instructions: </span>
              <span className="font-medium text-gray-800">{order.specialInstructions}</span>
            </p>
          )}
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-200">
        <h3 className="font-semibold text-gray-600 text-sm mb-3 pb-2 border-b border-pink-200">Price Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {scoop?.emoji} {scoop?.name}
            </span>
            <span className="font-medium">₹{scoopPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {packing?.emoji} {packing?.name}
            </span>
            <span className="font-medium">₹{packingPrice}</span>
          </div>
          {order.includeVideo && (
            <div className="flex justify-between">
              <span className="text-gray-600">🎥 Video Capture</span>
              <span className="font-medium">₹{videoPrice}</span>
            </div>
          )}
          <div className="border-t border-pink-200 pt-2.5 mt-2 flex justify-between items-center">
            <span className="font-bold text-gray-700 text-base">Total</span>
            <span className="font-extrabold text-pink-600 text-2xl">₹{total}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl py-3">
        <span>🔒</span>
        <span>100% secure payment powered by Razorpay</span>
      </div>

      {/* Test mode helper — remove before going live */}
      {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith('rzp_test_') && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-4 text-xs text-yellow-800">
          <p className="font-bold mb-1">🧪 Test Mode — Sample Payment Details</p>
          <p>Card: <span className="font-mono font-semibold">4111 1111 1111 1111</span></p>
          <p>Expiry: <span className="font-mono font-semibold">12/26</span> &nbsp; CVV: <span className="font-mono font-semibold">123</span></p>
          <p className="mt-1">When OTP is asked, enter: <span className="font-mono font-semibold">1234</span></p>
          <p className="mt-1">Or use UPI ID: <span className="font-mono font-semibold">success@razorpay</span></p>
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [order, setOrder] = useState({
    scoopType: '',
    packingType: '',
    includeVideo: false,
    name: '',
    age: '',
    address: '',
    phone: '',
    specialInstructions: '',
  });

  // Price calculations
  const scoop = SCOOP_TYPES.find((s) => s.id === order.scoopType);
  const packing = PACKING_TYPES.find((p) => p.id === order.packingType);
  const scoopPrice = scoop?.price ?? 0;
  const packingPrice = packing?.price ?? 0;
  const videoPrice = order.includeVideo ? 50 : 0;
  const total = scoopPrice + packingPrice + videoPrice;

  // Running total badge (visible from step 2+)
  const showTotal = step >= 2 && scoopPrice > 0;

  function validateStep(s) {
    const newErrors = {};
    if (s === 1 && !order.scoopType) {
      newErrors.scoopType = 'Please select a scoop type to continue.';
    }
    if (s === 2 && !order.packingType) {
      newErrors.packingType = 'Please select a packing type to continue.';
    }
    if (s === 3) {
      if (!order.name.trim()) newErrors.name = 'Full name is required.';
      if (!order.age || Number(order.age) < 1 || Number(order.age) > 120)
        newErrors.age = 'Please enter a valid age.';
      if (!order.address.trim()) newErrors.address = 'Delivery address is required.';
      if (!order.phone || !/^[6-9]\d{9}$/.test(order.phone))
        newErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) {
      setErrors({});
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handlePayment() {
    if (!razorpayReady) {
      alert('Payment gateway is loading, please wait a moment and try again.');
      return;
    }
    setProcessing(true);

    try {
      // 1. Create Razorpay order on backend
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, orderDetails: order }),
      });

      if (!res.ok) throw new Error('Failed to create order. Please try again.');
      const { orderId, error } = await res.json();
      if (error) throw new Error(error);

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: total * 100, // paise
        currency: 'INR',
        name: 'Scoopy Surprises',
        description: `${scoop?.name} · ${packing?.name}${order.includeVideo ? ' · Video' : ''}`,
        order_id: orderId,
        prefill: {
          name: order.name,
          contact: `+91${order.phone}`,
        },
        theme: { color: '#EC4899' },
        modal: {
          ondismiss: () => setProcessing(false),
        },
        handler: async function (response) {
          // 3. Verify payment & send WhatsApp notification
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: order,
              total,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            // Save to localStorage for success page
            localStorage.setItem(
              'scoopyLastOrder',
              JSON.stringify({
                ...order,
                scoop: scoop?.name,
                packing: packing?.name,
                total,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              })
            );
            window.location.href = '/success';
          } else {
            alert('Payment verification failed. Please contact us with your payment reference.');
            setProcessing(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function () {
        alert('Payment failed. Please try again or use a different payment method.');
        setProcessing(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      alert(err.message || 'Something went wrong. Please try again.');
      setProcessing(false);
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setRazorpayReady(true)}
      />

      <div className="min-h-screen confetti-bg">
        {/* ── Header ── */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-pink-100 shadow-sm">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl animate-bounce-soft">🍦</span>
              <div>
                <h1 className="text-base font-extrabold text-pink-600 leading-none">Scoopy Surprises</h1>
                <p className="text-xs text-gray-400">Every scoop is a story ✨</p>
              </div>
            </div>
            {showTotal && (
              <div className="bg-pink-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow">
                ₹{total}
              </div>
            )}
          </div>
        </header>

        {/* ── Step bar ── */}
        <StepBar step={step} />

        {/* ── Content ── */}
        <main className="max-w-lg mx-auto px-4 pb-32">
          {step === 1 && <Step1 order={order} setOrder={setOrder} errors={errors} />}
          {step === 2 && <Step2 order={order} setOrder={setOrder} errors={errors} />}
          {step === 3 && <Step3 order={order} setOrder={setOrder} errors={errors} />}
          {step === 4 && (
            <Step4
              order={order}
              scoop={scoop}
              packing={packing}
              scoopPrice={scoopPrice}
              packingPrice={packingPrice}
              videoPrice={videoPrice}
              total={total}
            />
          )}
        </main>

        {/* ── Fixed bottom navigation ── */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 shadow-lg z-20">
          <div className="max-w-lg mx-auto px-4 py-3 flex gap-3">
            {step > 1 && (
              <button
                onClick={handleBack}
                disabled={processing}
                className="px-6 py-3.5 border-2 border-pink-300 text-pink-600 rounded-2xl font-semibold text-sm hover:bg-pink-50 transition-all disabled:opacity-40"
              >
                ← Back
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={handleNext}
                className="flex-1 py-3.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-2xl font-bold text-sm hover:from-pink-600 hover:to-rose-500 transition-all shadow-md shadow-pink-200 active:scale-95"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handlePayment}
                disabled={processing || !razorpayReady}
                className="flex-1 py-3.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-2xl font-bold text-base hover:from-pink-600 hover:to-rose-500 transition-all shadow-md shadow-pink-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing…
                  </span>
                ) : (
                  `💳 Pay ₹${total} Securely`
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
