import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  ZoomIn,
  Check,
  Share2,
  Sparkles,
  X
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateView,
    setIsCheckoutOpen,
    showToast,
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'care' | 'shipping' | 'reviews'>('specs');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!selectedProduct) {
    return (
      <div className="py-24 text-center">
        <p className="text-sm text-[#292522]/70 mb-4">No product selected.</p>
        <button
          onClick={() => navigateView('home')}
          className="px-6 py-2.5 bg-[#641F2A] text-white text-xs uppercase tracking-wider"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const p = selectedProduct;
  const isFavorited = isInWishlist(p.id);
  const discountPercent = p.originalPrice
    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
    : 0;

  // Related products from the same category
  const relatedProducts = PRODUCTS.filter(
    (item) => item.category === p.category && item.id !== p.id
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(p, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: p.name,
        text: p.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard.', 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewText) return;
    setReviewSubmitted(true);
    showToast('Thank you for sharing your review with Monvi Art.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F8F3EA] pb-24">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E8DFC8] bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-[#292522]/60 flex items-center gap-1.5 font-medium">
          <button onClick={() => navigateView('home')} className="hover:text-[#641F2A]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => navigateView('collection', p.category)}
            className="hover:text-[#641F2A]"
          >
            {p.categoryLabel}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#292522] truncate max-w-xs">{p.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Image Gallery with Zoom */}
          <div className="lg:col-span-7">
            <div className="sticky top-28 space-y-4">
              <div className="relative aspect-[4/3] bg-white border border-[#E8DFC8] overflow-hidden group">
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center cursor-zoom-in"
                  onClick={() => setIsZoomOpen(true)}
                />

                {/* Zoom Trigger Button */}
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-4 right-4 p-2.5 bg-white/90 text-[#292522] hover:bg-white hover:text-[#641F2A] shadow-md transition-colors text-xs font-semibold uppercase flex items-center gap-1.5"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>Click to Zoom</span>
                </button>

                {p.tag && (
                  <div className="absolute top-4 left-4 bg-[#641F2A] text-white px-3 py-1 text-[11px] uppercase tracking-wider font-semibold">
                    {p.tag}
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {[p.image, p.image, p.image, p.image].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setIsZoomOpen(true)}
                    className={`aspect-square border bg-white overflow-hidden ${
                      idx === 0 ? 'border-[#641F2A]' : 'border-[#E8DFC8] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${p.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="bg-white p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B08D57]">
                  {p.categoryLabel}
                </span>
                <button
                  onClick={handleShare}
                  className="p-1.5 text-[#292522]/60 hover:text-[#641F2A] transition-colors"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#292522] mb-3 leading-snug">
                {p.name}
              </h1>

              {/* Reviews rating badge */}
              <div className="flex items-center gap-2 mb-6 pb-6 border-b border-[#F0E6D5]">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(p.rating)
                          ? 'fill-[#B08D57] text-[#B08D57]'
                          : 'text-[#E8DFC8]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#292522] tabular-nums font-mono">
                  {p.rating.toFixed(1)}
                </span>
                <span className="text-xs text-[#292522]/50">
                  ({p.reviewsCount} verified reviews)
                </span>
              </div>

              {/* Price Module */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-semibold text-[#292522] tabular-nums font-mono">
                  ₹{p.price.toLocaleString('en-IN')}
                </span>
                {p.originalPrice && (
                  <>
                    <span className="text-base text-[#292522]/40 line-through tabular-nums font-mono">
                      ₹{p.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="px-2 py-0.5 bg-[#641F2A]/10 text-[#641F2A] text-xs font-bold uppercase tracking-wider">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              <div className="text-xs text-[#292522]/70 mb-6 font-normal leading-relaxed">
                Inclusive of all taxes. Free insured Pan-India shipping applied at checkout.
              </div>

              {/* Description */}
              <div className="text-sm text-[#292522]/85 leading-relaxed mb-6 font-normal">
                {p.description}
              </div>

              {/* Quantity & Buy CTAs */}
              <div className="space-y-4 pt-4 border-t border-[#F0E6D5]">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#292522]">
                    Quantity
                  </span>
                  <div className="flex items-center border border-[#D5C6AF] bg-[#F8F3EA]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-base text-[#292522] hover:bg-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-semibold text-[#292522] tabular-nums font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-base text-[#292522] hover:bg-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => addToCart(p, quantity)}
                    className="py-4 px-6 bg-[#641F2A] hover:bg-[#7D2836] text-[#F8F3EA] text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-4 px-6 bg-[#292522] hover:bg-black text-[#F8F3EA] text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(p)}
                  className={`w-full py-3 px-4 border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                    isFavorited
                      ? 'border-[#641F2A] text-[#641F2A] bg-[#641F2A]/5'
                      : 'border-[#D5C6AF] text-[#292522] hover:border-[#641F2A]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#641F2A]' : ''}`} />
                  <span>{isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Trust Features Accordion */}
              <div className="mt-8 pt-6 border-t border-[#F0E6D5] space-y-3 text-xs text-[#292522]/80">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-[#B08D57] shrink-0" />
                  <span>Dispatched in 24–48 hours in insured archival packaging.</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-4 h-4 text-[#B08D57] shrink-0" />
                  <span>7-Day hassle-free return or exchange policy.</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#B08D57] shrink-0" />
                  <span>100% genuine craftsmanship guarantee.</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Detailed Tabs: Specifications, Care, Shipping, Reviews */}
        <div className="mt-16 bg-white border border-[#E8DFC8]">
          <div className="flex border-b border-[#E8DFC8] overflow-x-auto text-xs uppercase tracking-wider font-semibold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-[#641F2A] text-[#641F2A]'
                  : 'border-transparent text-[#292522]/70 hover:text-[#292522]'
              }`}
            >
              Product Specifications
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'care'
                  ? 'border-[#641F2A] text-[#641F2A]'
                  : 'border-transparent text-[#292522]/70 hover:text-[#292522]'
              }`}
            >
              Care & Maintenance
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'shipping'
                  ? 'border-[#641F2A] text-[#641F2A]'
                  : 'border-transparent text-[#292522]/70 hover:text-[#292522]'
              }`}
            >
              Shipping & Returns
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-[#641F2A] text-[#641F2A]'
                  : 'border-transparent text-[#292522]/70 hover:text-[#292522]'
              }`}
            >
              Customer Reviews ({p.reviewsCount})
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {activeTab === 'specs' && (
              <div className="max-w-3xl">
                <h3 className="font-serif text-xl text-[#292522] mb-4">Detailed Specifications</h3>
                <dl className="divide-y divide-[#F0E6D5] text-xs">
                  {p.specifications.material && (
                    <div className="py-3 grid grid-cols-3">
                      <dt className="font-semibold text-[#292522]/70">Material</dt>
                      <dd className="col-span-2 text-[#292522]">{p.specifications.material}</dd>
                    </div>
                  )}
                  {p.specifications.dimensions && (
                    <div className="py-3 grid grid-cols-3">
                      <dt className="font-semibold text-[#292522]/70">Dimensions</dt>
                      <dd className="col-span-2 text-[#292522]">{p.specifications.dimensions}</dd>
                    </div>
                  )}
                  {p.specifications.weight && (
                    <div className="py-3 grid grid-cols-3">
                      <dt className="font-semibold text-[#292522]/70">Weight</dt>
                      <dd className="col-span-2 text-[#292522]">{p.specifications.weight}</dd>
                    </div>
                  )}
                  {p.specifications.volume && (
                    <div className="py-3 grid grid-cols-3">
                      <dt className="font-semibold text-[#292522]/70">Net Volume</dt>
                      <dd className="col-span-2 text-[#292522]">{p.specifications.volume}</dd>
                    </div>
                  )}
                  {p.specifications.skinType && (
                    <div className="py-3 grid grid-cols-3">
                      <dt className="font-semibold text-[#292522]/70">Suitability</dt>
                      <dd className="col-span-2 text-[#292522]">{p.specifications.skinType}</dd>
                    </div>
                  )}
                  {p.specifications.origin && (
                    <div className="py-3 grid grid-cols-3">
                      <dt className="font-semibold text-[#292522]/70">Artisan Origin</dt>
                      <dd className="col-span-2 text-[#292522]">{p.specifications.origin}</dd>
                    </div>
                  )}
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-semibold text-[#292522]/70">Availability</dt>
                    <dd className="col-span-2 text-emerald-700 font-semibold">
                      In Stock (Ready for immediate dispatch)
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="max-w-3xl">
                <h3 className="font-serif text-xl text-[#292522] mb-4">Care Instructions</h3>
                <p className="text-xs sm:text-sm text-[#292522]/80 leading-relaxed mb-4">
                  {p.specifications.careInstructions || 'Keep in clean, dry conditions away from moisture.'}
                </p>
                <div className="p-4 bg-[#F8F3EA] border border-[#E8DFC8] text-xs text-[#292522]/80 space-y-2">
                  <div className="font-semibold text-[#641F2A]">Artisan Preservation Advice:</div>
                  <p>
                    Because this item incorporates hand-treated natural materials and classical methods, mild organic variations in tone, grain, and finish are celebrated indicators of authentic handmade craft.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-[#292522]/80 leading-relaxed">
                <h3 className="font-serif text-xl text-[#292522]">Shipping & Delivery</h3>
                <p>
                  All Monvi Art orders are dispatched within 24 to 48 hours from our central studios in Jaipur and Delhi. Express insured courier delivery takes 3–5 business days across Indian metros.
                </p>
                <h4 className="font-semibold text-[#292522] pt-2">Returns & Exchanges</h4>
                <p>
                  We offer a complimentary 7-day exchange window if your item arrives damaged or does not meet your discerning expectations. Simply contact our concierge team with your order number.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-serif text-2xl text-[#292522]">Verified Customer Reviews</h3>
                    <p className="text-xs text-[#292522]/70">Based on {p.reviewsCount} verified purchase evaluations</p>
                  </div>
                </div>

                {/* Form to submit review */}
                <div className="p-6 bg-[#F8F3EA] border border-[#E8DFC8] mb-8">
                  <h4 className="font-serif text-lg text-[#292522] mb-3">Leave a Review</h4>
                  {reviewSubmitted ? (
                    <div className="text-xs text-emerald-800 font-medium">
                      ✓ Thank you! Your review has been recorded.
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={newReviewAuthor}
                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                            placeholder="e.g. Shalini Roy"
                            className="w-full px-3 py-2 bg-white border border-[#D5C6AF] text-xs text-[#292522]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                            Rating
                          </label>
                          <select
                            value={newReviewRating}
                            onChange={(e) => setNewReviewRating(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-white border border-[#D5C6AF] text-xs text-[#292522]"
                          >
                            <option value={5}>5 Stars - Exceptional</option>
                            <option value={4}>4 Stars - Very Good</option>
                            <option value={3}>3 Stars - Satisfactory</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                          Review Feedback
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={newReviewText}
                          onChange={(e) => setNewReviewText(e.target.value)}
                          placeholder="Share your thoughts on the craftsmanship, packaging, and everyday use..."
                          className="w-full px-3 py-2 bg-white border border-[#D5C6AF] text-xs text-[#292522]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#641F2A] text-white text-xs uppercase tracking-wider font-semibold"
                      >
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like (Related Products) */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#B08D57] font-semibold">
                  Complementary Finds
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#292522] mt-1 font-normal">
                  You May Also Like
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Full-Screen Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-3 text-white hover:text-[#B08D57] transition-colors"
            aria-label="Close zoom"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img
              src={p.image}
              alt={p.name}
              className="max-h-[85vh] w-auto mx-auto object-contain shadow-2xl"
            />
            <div className="text-center text-[#F8F3EA] text-sm mt-3 font-serif">
              {p.name} · {p.categoryLabel}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
