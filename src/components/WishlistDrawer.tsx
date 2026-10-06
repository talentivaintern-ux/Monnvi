import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    addToCart,
    toggleWishlist,
    viewProductDetail,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F3EA] border-l border-[#E0D4C0] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#641F2A] fill-[#641F2A]" />
              <h2 className="font-serif text-xl text-[#292522]">
                Saved Wishlist ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#292522]/60 hover:text-[#292522] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white border border-[#E8DFC8] flex items-center justify-center text-[#292522]/30">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-[#292522] mb-2">No Saved Items Yet</h3>
                <p className="text-xs text-[#292522]/70 mb-6 max-w-xs mx-auto">
                  Click the heart icon on any product to save pieces you adore for later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-3 bg-[#641F2A] text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-4 p-4 bg-white border border-[#E8DFC8]"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 object-cover bg-[#F5EFE6] border border-[#E8DFC8] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            viewProductDetail(p);
                          }}
                          className="font-serif text-sm font-medium text-[#292522] hover:text-[#641F2A] cursor-pointer line-clamp-1"
                        >
                          {p.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(p)}
                          className="text-[#292522]/40 hover:text-[#A65D45] transition-colors p-0.5"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#B08D57] font-medium uppercase tracking-wider">
                        {p.categoryLabel}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm font-semibold font-mono tabular-nums text-[#292522]">
                        ₹{p.price.toLocaleString('en-IN')}
                      </div>
                      <button
                        onClick={() => {
                          addToCart(p);
                        }}
                        className="py-1.5 px-3 bg-[#641F2A] text-white text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1 hover:bg-[#7D2836] transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
