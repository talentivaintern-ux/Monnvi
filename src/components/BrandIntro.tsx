import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';

export const BrandIntro: React.FC = () => {
  const { navigateView } = useShop();

  return (
    <section className="py-20 lg:py-28 bg-[#F8F3EA] border-b border-[#E8DFC8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle decorative motif */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px bg-[#B08D57]/60" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold">
            The Monvi Art Ethos
          </span>
          <div className="w-12 h-px bg-[#B08D57]/60" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl text-[#292522] font-normal tracking-tight mb-8 text-balance">
          Crafting Your Everyday Luxury.
        </h2>

        {/* Brand Text */}
        <p className="text-base sm:text-lg text-[#292522]/80 leading-relaxed font-normal max-w-3xl mx-auto mb-10 text-balance">
          “Monvi Art brings together the soul of Indian craftsmanship and the beauty of modern living. From expressive Madhubani artworks and handcrafted metal décor to elegant jewellery and everyday beauty essentials, every collection is chosen to add character, beauty and timeless elegance to your life.”
        </p>

        {/* CTA */}
        <div>
          <button
            onClick={() => navigateView('about')}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#641F2A] text-[#641F2A] hover:bg-[#641F2A] hover:text-[#F8F3EA] text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200"
          >
            <span>Discover Our Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
