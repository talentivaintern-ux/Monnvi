import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from './ProductCard';
import { ProductCategory, Product } from '../types';
import { Filter, SlidersHorizontal, ArrowUpDown, ChevronDown, Check, RotateCcw } from 'lucide-react';

export const CollectionPage: React.FC = () => {
  const { selectedCategory, navigateView } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under-2000' | '2000-4000' | 'above-4000'>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Current category info
  const currentCategoryInfo = useMemo(() => {
    if (selectedCategory === 'all') {
      return {
        title: 'All Collections',
        tagline: 'Crafting Your Everyday Luxury',
        description: 'Explore our complete curation of Madhubani art, handcrafted metal decor, timeless imitation jewellery, and clean beauty essentials.',
        heroHeadline: 'Art, Beauty & Living in One Destination',
        image: '/src/assets/images/hero_monvi_art_lifestyle_1791299604226.jpg',
      };
    }
    const cat = CATEGORIES.find((c) => c.id === selectedCategory);
    return cat || {
      title: 'Collection',
      tagline: 'Artisan Living',
      description: 'Explore handcrafted luxury creations.',
      heroHeadline: 'Curated Indian Excellence',
      image: '/src/assets/images/hero_monvi_art_lifestyle_1791299604226.jpg',
    };
  }, [selectedCategory]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    if (priceFilter === 'under-2000') {
      list = list.filter((p) => p.price < 2000);
    } else if (priceFilter === '2000-4000') {
      list = list.filter((p) => p.price >= 2000 && p.price <= 4000);
    } else if (priceFilter === 'above-4000') {
      list = list.filter((p) => p.price > 4000);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return list;
  }, [selectedCategory, priceFilter, inStockOnly, sortBy]);

  const resetFilters = () => {
    setPriceFilter('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#F8F3EA]">
      {/* Category Hero Banner */}
      <div className="relative py-16 sm:py-24 bg-[#292522] overflow-hidden text-[#F8F3EA]">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={currentCategoryInfo.image}
            alt={currentCategoryInfo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#292522]/80 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold mb-2">
            {currentCategoryInfo.tagline}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal mb-4">
            {currentCategoryInfo.title}
          </h1>
          <p className="text-sm sm:text-base text-[#EFE5D4]/80 max-w-2xl mx-auto leading-relaxed">
            {currentCategoryInfo.description}
          </p>
        </div>
      </div>

      {/* Category Navigation Pills / Tabs */}
      <div className="border-b border-[#E8DFC8] bg-white sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 sm:space-x-8 overflow-x-auto py-3 no-scrollbar text-xs uppercase tracking-wider font-semibold">
            <button
              onClick={() => navigateView('collection', 'all')}
              className={`py-2 px-3 whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'text-[#641F2A] border-b-2 border-[#641F2A]'
                  : 'text-[#292522]/70 hover:text-[#292522]'
              }`}
            >
              All Collections ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => navigateView('collection', cat.id as ProductCategory)}
                  className={`py-2 px-3 whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'text-[#641F2A] border-b-2 border-[#641F2A]'
                      : 'text-[#292522]/70 hover:text-[#292522]'
                  }`}
                >
                  {cat.title} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controls Bar: Filters & Sort */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFC8] pb-6">
          {/* Result Count */}
          <div className="text-xs text-[#292522]/70 font-medium">
            Showing <span className="font-bold text-[#292522]">{filteredProducts.length}</span> handcrafted pieces
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Price Filter dropdown */}
            <div className="relative">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as any)}
                className="appearance-none bg-white border border-[#D5C6AF] px-3.5 py-2 pr-8 text-xs text-[#292522] font-medium focus:outline-none focus:border-[#641F2A]"
              >
                <option value="all">Price: All Ranges</option>
                <option value="under-2000">Under ₹2,000</option>
                <option value="2000-4000">₹2,000 – ₹4,000</option>
                <option value="above-4000">Above ₹4,000</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#292522]/60 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-[#D5C6AF] px-3.5 py-2 pr-8 text-xs text-[#292522] font-medium focus:outline-none focus:border-[#641F2A]"
              >
                <option value="featured">Sort by: Curated Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#292522]/60 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* In stock toggle */}
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`px-3 py-2 border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                inStockOnly
                  ? 'bg-[#641F2A] border-[#641F2A] text-white'
                  : 'bg-white border-[#D5C6AF] text-[#292522] hover:border-[#641F2A]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${inStockOnly ? 'bg-white' : 'bg-emerald-600'}`} />
              <span>In Stock Only</span>
            </button>

            {/* Reset */}
            {(priceFilter !== 'all' || inStockOnly || sortBy !== 'featured') && (
              <button
                onClick={resetFilters}
                className="p-2 text-xs text-[#A65D45] hover:text-[#641F2A] flex items-center gap-1"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-8 pb-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="font-serif text-2xl text-[#292522] mb-3">No products match your current filters</h3>
            <p className="text-sm text-[#292522]/70 mb-6">Try broadening your price or category selection.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#641F2A] text-white text-xs uppercase tracking-wider font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
