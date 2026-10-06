import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  const { navigateView } = useShop();
  // Select 4-8 featured items across diverse categories
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <section className="py-20 lg:py-28 bg-[#F8F3EA] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-[#B08D57] font-semibold">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292522] mt-2 mb-3 font-normal">
              Curated For You
            </h2>
            <p className="text-sm sm:text-base text-[#292522]/70 max-w-xl font-normal">
              Pieces chosen to bring beauty, character and elegance into everyday moments.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => navigateView('collection', 'all')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#641F2A] hover:text-[#292522] transition-colors pb-1 border-b border-[#641F2A]"
            >
              <span>Explore All Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
