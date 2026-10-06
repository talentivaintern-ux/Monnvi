import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types';

export const CategoryShowcase: React.FC = () => {
  const { navigateView } = useShop();

  return (
    <section className="py-20 lg:py-28 bg-[#F4EDE0]/60 border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.22em] text-[#B08D57] font-semibold">
            Distinctive Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292522] mt-2 mb-4 font-normal">
            Shop by Category
          </h2>
          <p className="text-sm text-[#292522]/70 font-normal">
            Four intentional avenues of Indian artistry, living accents, adornment, and radiant self-care.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateView('collection', cat.id as ProductCategory)}
              className="group cursor-pointer flex flex-col bg-white border border-[#E8DFC8] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#B08D57]"
            >
              {/* Category Image with soft zoom */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE2D5]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />
                
                {/* Number Badge */}
                <div className="absolute top-4 left-4 w-9 h-9 bg-[#292522]/85 backdrop-blur-xs text-[#F8F3EA] flex items-center justify-center font-serif text-sm border border-white/20">
                  {cat.number}
                </div>

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Category Info */}
              <div className="p-6 flex flex-col flex-1 bg-white justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#292522] group-hover:text-[#641F2A] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#292522]/70 leading-relaxed mb-6 font-normal">
                    {cat.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F5EFE6] flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#641F2A] group-hover:text-[#292522] transition-colors">
                  <span>{cat.ctaText}</span>
                  <div className="w-7 h-7 rounded-full bg-[#F8F3EA] group-hover:bg-[#641F2A] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
