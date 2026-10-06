import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView,
    viewProductDetail,
  } = useShop();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col bg-white border border-[#EBE1CF] transition-all duration-300 hover:shadow-lg hover:border-[#D6C2A5]">
      {/* Image Container with Hover Actions */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#F5EFE6]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Text Tag (No pill, quiet luxury text) */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-[#F8F3EA]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#641F2A] border border-[#E2D5BE]">
            {product.tag}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isFavorited
              ? 'bg-[#641F2A] text-white shadow-sm'
              : 'bg-white/85 text-[#292522] hover:bg-white hover:text-[#641F2A] shadow-xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Desktop Quick Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hidden sm:flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-[#F8F3EA] text-[#292522] hover:bg-white text-xs font-medium tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-1 py-2 px-3 bg-[#641F2A] text-white hover:bg-[#7D2836] text-xs font-medium tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-[#292522]/60 mb-1.5">
          <span className="uppercase tracking-widest text-[11px] font-medium text-[#B08D57]">
            {product.categoryLabel}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#292522]/80">
            <Star className="w-3 h-3 fill-[#B08D57] text-[#B08D57]" />
            <span className="tabular-nums font-mono">{product.rating.toFixed(1)}</span>
            <span className="text-[#292522]/40">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <button
          onClick={() => viewProductDetail(product)}
          className="text-left font-serif text-base sm:text-lg font-medium text-[#292522] hover:text-[#641F2A] transition-colors line-clamp-1 mb-2"
          title={product.name}
        >
          {product.name}
        </button>

        {/* Short description */}
        <p className="text-xs text-[#292522]/70 line-clamp-1 mb-3 font-normal">
          {product.shortDescription}
        </p>

        {/* Price & Action Module */}
        <div className="mt-auto pt-2 border-t border-[#F5EFE6] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#292522] tabular-nums font-mono">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-[#292522]/40 line-through tabular-nums font-mono">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] font-medium text-[#641F2A]">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Mobile direct Add to Cart icon */}
          <button
            onClick={() => addToCart(product)}
            className="sm:hidden p-2 bg-[#641F2A] text-[#F8F3EA] hover:bg-[#7D2836] transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
