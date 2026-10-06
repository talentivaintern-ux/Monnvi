import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { OrderDetails } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    completeOrder,
  } = useShop();

  const [formData, setFormData] = useState({
    name: 'Aishwarya Sharma',
    email: 'aishwarya.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Royal Palms Heights, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560038',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = `MONVI-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      orderId,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartTotal,
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pinCode,
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI Instant Payment'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : paymentMethod === 'netbanking'
          ? 'Net Banking'
          : 'Cash on Delivery (COD)',
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedOrder(newOrder);
      completeOrder(newOrder);
    }, 800);
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#F8F3EA] border border-[#E0D4C0] shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold">
              Distraction-Free Checkout
            </div>
            <h2 className="font-serif text-2xl text-[#292522]">
              {confirmedOrder ? 'Order Confirmed' : 'Complete Your Purchase'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#292522]/60 hover:text-[#292522] transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedOrder ? (
          <div className="p-8 sm:p-12 text-center bg-white">
            <div className="w-16 h-16 mx-auto mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center rounded-full">
              <PackageCheck className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
              Thank You for Supporting Indian Craftsmanship
            </span>
            <h3 className="font-serif text-3xl text-[#292522] mt-1 mb-2">
              Order #{confirmedOrder.orderId} Confirmed
            </h3>
            <p className="text-sm text-[#292522]/70 max-w-lg mx-auto mb-8 font-normal">
              A detailed confirmation receipt and tracking link have been dispatched to{' '}
              <strong>{confirmedOrder.email}</strong>. Our artisans and dispatch team are carefully packaging your selection in insured museum packaging.
            </p>

            {/* Receipt Summary Box */}
            <div className="max-w-md mx-auto p-6 bg-[#F8F3EA] border border-[#E8DFC8] text-left text-xs mb-8">
              <div className="font-serif text-base font-semibold text-[#292522] mb-3 pb-2 border-b border-[#E8DFC8]">
                Summary of Shipment
              </div>
              <div className="space-y-2 mb-4 text-[#292522]/80">
                <div className="flex justify-between">
                  <span>Recipient:</span>
                  <span className="font-semibold text-[#292522]">{confirmedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Address:</span>
                  <span className="text-right max-w-[200px]">
                    {confirmedOrder.address}, {confirmedOrder.city}, {confirmedOrder.pinCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Mode:</span>
                  <span className="font-semibold">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount Paid:</span>
                  <span className="font-semibold font-mono tabular-nums text-sm text-[#641F2A]">
                    ₹{confirmedOrder.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-[#292522]/60 pt-2 border-t border-[#E8DFC8]">
                Estimated Delivery: 3–5 Business Days via Express Insured Courier
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 bg-[#641F2A] hover:bg-[#7D2836] text-[#F8F3EA] text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
            >
              Continue Exploring Monvi Art
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Customer & Shipping Details (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Customer Contact */}
                <div className="bg-white p-5 border border-[#E8DFC8]">
                  <h3 className="font-serif text-lg text-[#292522] mb-4 pb-2 border-b border-[#F0E6D5]">
                    1. Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] focus:border-[#641F2A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                        Mobile Phone (+91) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] focus:border-[#641F2A]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                        Email Address (for order tracking) *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] focus:border-[#641F2A]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div className="bg-white p-5 border border-[#E8DFC8]">
                  <h3 className="font-serif text-lg text-[#292522] mb-4 pb-2 border-b border-[#F0E6D5]">
                    2. Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                        Street Address / Flat / Floor *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] focus:border-[#641F2A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] focus:border-[#641F2A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] focus:border-[#641F2A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pinCode}
                        onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] focus:border-[#641F2A]"
                      />
                    </div>
                    <div className="flex items-center text-xs text-[#292522]/80 pt-4">
                      <Truck className="w-4 h-4 text-[#B08D57] mr-2 shrink-0" />
                      <span>Complimentary insured shipping across India.</span>
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="bg-white p-5 border border-[#E8DFC8]">
                  <h3 className="font-serif text-lg text-[#292522] mb-4 pb-2 border-b border-[#F0E6D5]">
                    3. Payment Method
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      {
                        id: 'upi',
                        title: 'UPI (GPay / PhonePe / Paytm / QR)',
                        desc: 'Instant verification & fast dispatch',
                        icon: QrCode,
                      },
                      {
                        id: 'card',
                        title: 'Credit / Debit Card',
                        desc: 'Visa, MasterCard, RuPay, Amex',
                        icon: CreditCard,
                      },
                      {
                        id: 'netbanking',
                        title: 'Net Banking',
                        desc: 'All major Indian nationalized & private banks',
                        icon: Building2,
                      },
                      {
                        id: 'cod',
                        title: 'Cash on Delivery (COD)',
                        desc: 'Available for verified residential addresses',
                        icon: Banknote,
                      },
                    ].map((m) => {
                      const Icon = m.icon;
                      const selected = paymentMethod === m.id;
                      return (
                        <label
                          key={m.id}
                          className={`flex items-start gap-3 p-3 border cursor-pointer transition-all ${
                            selected
                              ? 'border-[#641F2A] bg-[#641F2A]/5'
                              : 'border-[#E8DFC8] bg-white hover:border-[#B08D57]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={selected}
                            onChange={() => setPaymentMethod(m.id as any)}
                            className="mt-1 text-[#641F2A] focus:ring-[#641F2A]"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-[#292522]">{m.title}</span>
                              <Icon className="w-4 h-4 text-[#B08D57]" />
                            </div>
                            <span className="text-[11px] text-[#292522]/60">{m.desc}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="bg-white p-6 border border-[#E8DFC8] shadow-xs">
                  <h3 className="font-serif text-lg text-[#292522] mb-4 pb-2 border-b border-[#F0E6D5]">
                    Order Summary ({cart.length} items)
                  </h3>

                  {/* Itemized Mini List */}
                  <div className="max-h-60 overflow-y-auto divide-y divide-[#F0E6D5] pr-1 mb-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 object-cover border border-[#E8DFC8]"
                          />
                          <div>
                            <div className="font-medium text-[#292522] line-clamp-1">{item.product.name}</div>
                            <div className="text-[10px] text-[#292522]/60">Qty: {item.quantity}</div>
                          </div>
                        </div>
                        <div className="font-mono tabular-nums font-semibold text-[#292522]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2 text-xs text-[#292522]/80 border-t border-[#F0E6D5] pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono tabular-nums font-semibold text-[#292522]">
                        ₹{cartSubtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-[#641F2A]">
                        <span>Coupon Discount ({appliedCoupon?.code})</span>
                        <span className="font-mono tabular-nums font-semibold">
                          -₹{cartDiscount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Insured Shipping</span>
                      <span className="font-mono tabular-nums font-semibold text-emerald-700">
                        {cartShipping === 0 ? 'Complimentary' : `₹${cartShipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-semibold text-[#292522] pt-3 border-t border-[#F0E6D5]">
                      <span>Grand Total</span>
                      <span className="font-mono tabular-nums text-lg text-[#641F2A]">
                        ₹{cartTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 py-4 bg-[#641F2A] hover:bg-[#7D2836] disabled:opacity-50 text-[#F8F3EA] text-xs font-semibold uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>{isSubmitting ? 'Securing Order...' : 'Place Order Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-4 border-t border-[#F0E6D5] space-y-2 text-[11px] text-[#292522]/70">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
                      <span>256-Bit SSL Encrypted Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-[#B08D57]" />
                      <span>7-Day Return & Exchange Promise</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </form>
        )}

      </div>
    </div>
  );
};
