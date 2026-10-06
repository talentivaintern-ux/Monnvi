import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Package, MapPin, User, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const AccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    orders,
    setIsWishlistOpen,
    navigateView,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  if (!isAccountOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={() => setIsAccountOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl bg-[#F8F3EA] border border-[#E0D4C0] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#641F2A] text-white flex items-center justify-center font-serif text-lg font-bold">
              M
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold">
                Patron Membership
              </div>
              <h2 className="font-serif text-2xl text-[#292522]">
                My Account & Orders
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 text-[#292522]/60 hover:text-[#292522] transition-colors"
            aria-label="Close account modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-[#E8DFC8] bg-white text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-6 border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-[#641F2A] text-[#641F2A]'
                : 'border-transparent text-[#292522]/70 hover:text-[#292522]'
            }`}
          >
            Order History ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 px-6 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-[#641F2A] text-[#641F2A]'
                : 'border-transparent text-[#292522]/70 hover:text-[#292522]'
            }`}
          >
            Saved Profile & Address
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-16 text-center">
                  <Package className="w-12 h-12 text-[#292522]/30 mx-auto mb-3" />
                  <h3 className="font-serif text-xl text-[#292522] mb-1">No Orders Placed Yet</h3>
                  <p className="text-xs text-[#292522]/70 mb-6 max-w-xs mx-auto">
                    When you order from Monvi Art, you can track delivery and view authentic provenance certificates here.
                  </p>
                  <button
                    onClick={() => {
                      setIsAccountOpen(false);
                      navigateView('collection', 'all');
                    }}
                    className="px-6 py-2.5 bg-[#641F2A] text-white text-xs uppercase tracking-wider font-semibold"
                  >
                    Start Exploring
                  </button>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.orderId} className="bg-white p-5 border border-[#E8DFC8] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0E6D5] text-xs">
                      <div>
                        <span className="font-semibold text-[#292522]">Order #{order.orderId}</span>
                        <span className="text-[#292522]/50 ml-2">Placed on {order.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium">
                        <Clock className="w-3 h-3 text-amber-700" />
                        <span>Dispatch in Progress (Jaipur Atelier)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.product.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-10 h-10 object-cover border border-[#E8DFC8]"
                            />
                            <div>
                              <div className="font-medium text-[#292522]">{item.product.name}</div>
                              <div className="text-[10px] text-[#292522]/50">Qty: {item.quantity} · {item.product.categoryLabel}</div>
                            </div>
                          </div>
                          <div className="font-mono font-semibold tabular-nums text-[#292522]">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#F0E6D5] flex items-center justify-between text-xs">
                      <span className="text-[#292522]/70">Paid via {order.paymentMethod}</span>
                      <div className="font-mono font-semibold text-sm text-[#641F2A]">
                        Total: ₹{order.total.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white p-6 border border-[#E8DFC8] space-y-6 text-xs text-[#292522]/80">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#641F2A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#292522]">Patron Details</h4>
                  <p className="mt-1">Aishwarya Sharma</p>
                  <p className="text-[#292522]/60">aishwarya.sharma@example.com · +91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-[#F0E6D5]">
                <MapPin className="w-5 h-5 text-[#641F2A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#292522]">Default Shipping Address</h4>
                  <p className="mt-1">Flat 402, Royal Palms Heights, Indiranagar</p>
                  <p>Bengaluru, Karnataka - 560038, India</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0E6D5] flex gap-3">
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="px-4 py-2 bg-[#F8F3EA] border border-[#D5C6AF] hover:border-[#641F2A] text-xs font-semibold text-[#292522]"
                >
                  View Saved Wishlist
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
