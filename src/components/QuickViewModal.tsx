import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    viewProductDetail,
  } = useShop();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const p = quickViewProduct;
  const isFavorited = isInWishlist(p.id);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={closeQuickView}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-[#E8DFC8] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#292522] rounded-full shadow-xs transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square sm:aspect-auto bg-[#F5EFE6]">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover object-center"
            />
            {p.tag && (
              <div className="absolute top-4 left-4 bg-[#641F2A] text-white px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold">
                {p.tag}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#B08D57] font-semibold mb-1">
                {p.categoryLabel}
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#292522] mb-2 leading-snug">
                {p.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-[#292522]/80 mb-4">
                <Star className="w-3.5 h-3.5 fill-[#B08D57] text-[#B08D57]" />
                <span className="font-mono font-semibold">{p.rating.toFixed(1)}</span>
                <span className="text-[#292522]/40">({p.reviewsCount} reviews)</span>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-mono font-semibold text-[#292522]">
                  ₹{p.price.toLocaleString('en-IN')}
                </span>
                {p.originalPrice && (
                  <span className="text-xs text-[#292522]/40 line-through font-mono">
                    ₹{p.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#292522]/75 leading-relaxed mb-6 font-normal">
                {p.shortDescription}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#F0E6D5]">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#D5C6AF] bg-[#F8F3EA] text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-[#292522]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-mono font-semibold text-[#292522]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-[#292522]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(p, quantity);
                    closeQuickView();
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#641F2A] hover:bg-[#7D2836] text-[#F8F3EA] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => toggleWishlist(p)}
                  className="text-xs text-[#292522]/70 hover:text-[#641F2A] flex items-center gap-1.5"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#641F2A] text-[#641F2A]' : ''}`} />
                  <span>{isFavorited ? 'Saved in Wishlist' : 'Save for Later'}</span>
                </button>

                <button
                  onClick={() => {
                    closeQuickView();
                    viewProductDetail(p);
                  }}
                  className="text-xs text-[#641F2A] hover:text-[#292522] font-semibold flex items-center gap-1"
                >
                  <span>Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
