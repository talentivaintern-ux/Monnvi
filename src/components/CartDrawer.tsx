import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Heart } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    cartItemsCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    toggleWishlist,
    viewProductDetail,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F3EA] border-l border-[#E0D4C0] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#641F2A]" />
              <h2 className="font-serif text-xl text-[#292522]">
                Shopping Bag ({cartItemsCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#292522]/60 hover:text-[#292522] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#F4EDE0] border-b border-[#E8DFC8] text-xs">
            {remainingForFreeShipping > 0 ? (
              <div>
                <span className="text-[#292522]">
                  Add <strong className="text-[#641F2A]">₹{remainingForFreeShipping}</strong> more for complimentary shipping!
                </span>
                <div className="w-full bg-[#E3D7C1] h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#641F2A] h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-emerald-800 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>You qualify for Complimentary Pan-India Insured Delivery!</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white border border-[#E8DFC8] flex items-center justify-center text-[#292522]/30">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-[#292522] mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-[#292522]/70 mb-6 max-w-xs mx-auto">
                  Discover thoughtfully curated art, home decor, jewellery, and beauty essentials.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-[#641F2A] text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-white border border-[#E8DFC8]"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-[#F5EFE6] border border-[#E8DFC8] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            viewProductDetail(item.product);
                          }}
                          className="font-serif text-sm font-medium text-[#292522] hover:text-[#641F2A] cursor-pointer line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#292522]/40 hover:text-[#A65D45] transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#B08D57] font-medium uppercase tracking-wider mt-0.5">
                        {item.product.categoryLabel}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#D5C6AF] bg-[#F8F3EA] text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-white text-[#292522]"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-mono tabular-nums font-semibold text-[#292522]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-white text-[#292522]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Line price */}
                      <div className="text-sm font-semibold font-mono tabular-nums text-[#292522]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8DFC8] space-y-4">
              {/* Coupon Code Section */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#F8F3EA] border border-[#B08D57] text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span className="font-semibold text-[#641F2A]">{appliedCoupon.code}</span>
                    <span className="text-[#292522]/60">({appliedCoupon.discountPercent}% off applied)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#292522]/60 hover:text-[#641F2A] text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon (Try MONVI10 or GLOW15)"
                    className="flex-1 px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] uppercase tracking-wider focus:outline-none focus:border-[#641F2A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#292522] text-[#F8F3EA] text-xs font-semibold uppercase tracking-wider hover:bg-[#641F2A] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#292522]/80 border-t border-[#F0E6D5] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-semibold text-[#292522]">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#641F2A]">
                    <span>Promotional Discount</span>
                    <span className="font-mono tabular-nums font-semibold">
                      -₹{cartDiscount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="font-mono tabular-nums font-semibold text-[#292522]">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-700">Complimentary</span>
                    ) : (
                      `₹${cartShipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-semibold text-[#292522] pt-2 border-t border-[#F0E6D5]">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-lg">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-[#641F2A] hover:bg-[#7D2836] text-[#F8F3EA] text-xs font-semibold uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-[#292522]/60">
                100% Secure Checkout · Authentic Provenance Guaranteed
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
