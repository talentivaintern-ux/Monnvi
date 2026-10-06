import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/categories';

export const Hero: React.FC = () => {
  const { navigateView } = useShop();

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[720px] bg-[#292522] overflow-hidden flex items-center">
      {/* Background Editorial Image with Luxury Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Monvi Art Luxury Indian Lifestyle"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.04]"
        />
        {/* Measured dark scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#292522]/90 via-[#292522]/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/95 via-transparent to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl text-left">
          
          {/* Brand Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F3EA]/10 border border-[#B08D57]/40 backdrop-blur-xs text-[#EFE5D4] text-xs uppercase tracking-[0.22em] mb-6 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Monvi Art Lifestyle</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F8F3EA] leading-[1.08] tracking-tight mb-4 text-balance">
            Art, Beauty & Living.
          </h1>

          {/* Subheading */}
          <p className="font-serif italic text-2xl sm:text-3xl text-[#EFE5D4]/90 font-light mb-6">
            Elegance in Every Detail.
          </p>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-[#F8F3EA]/80 font-normal leading-relaxed max-w-xl mb-10">
            Discover thoughtfully curated art, timeless home accents, elegant jewellery and beauty essentials inspired by the beauty of India.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => navigateView('collection', 'all')}
              className="px-8 py-4 bg-[#641F2A] hover:bg-[#7E2937] text-[#F8F3EA] text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleScrollToSection('new-arrivals-section')}
              className="px-8 py-4 bg-transparent hover:bg-[#F8F3EA]/10 text-[#F8F3EA] border border-[#F8F3EA]/50 hover:border-[#F8F3EA] text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 flex items-center justify-center"
            >
              Shop New Arrivals
            </button>
          </div>

          {/* Trust markers */}
          <div className="mt-12 pt-8 border-t border-white/15 flex items-center gap-8 text-xs text-[#EFE5D4]/75">
            <div>
              <div className="font-serif text-xl text-[#F8F3EA] font-semibold">100%</div>
              <div className="text-[11px] tracking-wider uppercase text-[#B08D57]">Authentic Craft</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="font-serif text-xl text-[#F8F3EA] font-semibold">4 Collections</div>
              <div className="text-[11px] tracking-wider uppercase text-[#B08D57]">Everyday Luxury</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="font-serif text-xl text-[#F8F3EA] font-semibold">Pan-India</div>
              <div className="text-[11px] tracking-wider uppercase text-[#B08D57]">Insured Delivery</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
