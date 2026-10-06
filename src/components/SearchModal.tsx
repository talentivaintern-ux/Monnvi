import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, Star } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, viewProductDetail } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularQueries = [
    'Brass Urli Bowl',
    'Tree of Life Madhubani',
    'Kundan Choker',
    'Kumkumadi Face Elixir',
    'Antique Diya',
    'Velvet Lipstick',
  ];

  const searchResults = searchTerm.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-3xl bg-[#F8F3EA] border border-[#E0D4C0] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E8DFC8] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#641F2A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Madhubani paintings, brass urli, Kundan jewellery, skincare..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#292522] placeholder-[#292522]/40 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-[#292522]/40 hover:text-[#292522]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase tracking-wider font-semibold text-[#641F2A] hover:text-[#292522] ml-2"
          >
            Cancel
          </button>
        </div>

        {/* Content Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {searchTerm.trim() === '' ? (
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#B08D57] font-semibold mb-3">
                Suggested Searches
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularQueries.map((query) => (
                  <button
                    key={query}
                    onClick={() => setSearchTerm(query)}
                    className="px-3.5 py-1.5 bg-white border border-[#E8DFC8] text-xs text-[#292522] hover:border-[#641F2A] hover:text-[#641F2A] transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>

              <div className="text-[11px] uppercase tracking-widest text-[#B08D57] font-semibold mb-3">
                Explore Core Categories
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {['Madhubani Art', 'Metal Home Decor', 'Imitation Jewellery', 'Cosmetics & Beauty'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSearchTerm(c)}
                    className="p-3 bg-white border border-[#E8DFC8] text-left hover:border-[#B08D57] transition-colors"
                  >
                    <div className="font-serif text-sm text-[#292522]">{c}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xs text-[#292522]/70 mb-4 font-medium">
                Found {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'} for "{searchTerm}"
              </div>

              {searchResults.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#292522]/60">
                  No products matched your search. Try searching by category like "brass", "painting", or "necklace".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        viewProductDetail(product);
                      }}
                      className="p-3 bg-white border border-[#E8DFC8] flex gap-3 hover:border-[#641F2A] cursor-pointer transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover bg-[#F5EFE6]"
                      />
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="text-[10px] uppercase tracking-wider text-[#B08D57] font-medium">
                          {product.categoryLabel}
                        </div>
                        <div className="font-serif text-sm text-[#292522] line-clamp-1 font-medium">
                          {product.name}
                        </div>
                        <div className="text-xs font-mono font-semibold text-[#292522] mt-1">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
