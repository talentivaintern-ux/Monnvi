import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Compass, Heart, Feather, Sparkles, Gem, Leaf } from 'lucide-react';
import { HERO_IMAGE } from '../data/categories';

export const AboutUsPage: React.FC = () => {
  const { navigateView, setIsContactOpen } = useShop();

  return (
    <div className="min-h-screen bg-[#F8F3EA]">
      {/* Editorial Header */}
      <div className="relative py-20 lg:py-32 bg-[#292522] text-[#F8F3EA] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src={HERO_IMAGE}
            alt="Monvi Art Craftsmanship Studio"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold mb-3">
            Our Heritage & Story
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#F8F3EA] mb-6 font-normal">
            The Story Behind Monvi Art
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#EFE5D4]/90 max-w-2xl mx-auto">
            “Art, Beauty & Living. Elegance in Every Detail.”
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Core Opening Text */}
        <div className="p-8 sm:p-12 bg-white border border-[#E8DFC8] shadow-xs mb-16 text-center sm:text-left">
          <p className="font-serif text-2xl sm:text-3xl text-[#292522] leading-snug mb-6 text-balance">
            “Monvi Art was created with a simple idea — to bring the beauty of Indian art, craftsmanship and contemporary lifestyle together under one thoughtfully curated destination.”
          </p>
          <p className="text-sm sm:text-base text-[#292522]/80 leading-relaxed font-normal">
            Too often, traditional Indian art and heritage objects are relegated to ceremonial closets or tourist souvenir stands. We envisioned a different rhythm: where an authentic Mithila painting commands pride of place in a modern minimalist apartment, where a hand-hammered Moradabad brass urli holds fresh jasmine by your work console, where heirloom Kundan jewellery is worn with effortless poise, and where clean botanical beauty rituals ground your mornings.
          </p>
        </div>

        {/* 1. Brand Philosophy */}
        <div className="mb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#B08D57] font-semibold mb-3">
            <Compass className="w-4 h-4 text-[#B08D57]" />
            <span>Foundational Belief</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#292522] mb-4">
            The Brand Philosophy: Everyday Luxury
          </h2>
          <p className="text-sm sm:text-base text-[#292522]/80 leading-relaxed font-normal mb-4">
            Luxury is neither excessive ornamentation nor inaccessible exclusivity. At Monvi Art, luxury is the intentionality of living with pieces that carry meaning, memory, and tactile soul. When every detail is considered—from the natural indigo mineral pigment ground by hand to the weighted balance of a brass diya lamp—everyday rituals become moments of quiet celebration.
          </p>
        </div>

        {/* 2. Deep Dive Into the Four Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          <div className="p-6 bg-white border border-[#E8DFC8]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A65D45] mb-2">
              <Feather className="w-4 h-4" />
              <span>Madhubani Art</span>
            </div>
            <h3 className="font-serif text-xl text-[#292522] mb-3">The Soul of Mithila</h3>
            <p className="text-xs sm:text-sm text-[#292522]/75 leading-relaxed">
              We partner directly with master women artists in Madhubani, Jitwarpur, and Ranti. Each piece is hand-inked on handmade archival paper using fine bamboo nibs, depicting sacred kalpavriksha trees, cosmic sun symbols, and playful fish harmony with natural botanical extracts.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8DFC8]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B08D57] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Metal Home Décor</span>
            </div>
            <h3 className="font-serif text-xl text-[#292522] mb-3">Timeless Sand-Cast Craft</h3>
            <p className="text-xs sm:text-sm text-[#292522]/75 leading-relaxed">
              Working with multigenerational metalsmiths in Moradabad and Thanjavur, our solid brass and bell-metal vessels celebrate the beauty of hand-hammered patinas. These objects bring warmth, light, and grounding presence to both classical and modern architecture.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8DFC8]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#641F2A] mb-2">
              <Gem className="w-4 h-4" />
              <span>Imitation Jewellery</span>
            </div>
            <h3 className="font-serif text-xl text-[#292522] mb-3">Heritage Without Heaviness</h3>
            <p className="text-xs sm:text-sm text-[#292522]/75 leading-relaxed">
              Our jewellery combines royal Kundan, Basra shell pearls, and Jaipur Meenakari enamel with lightweight ergonomic designs. Whether styling for festive celebrations or casual gatherings, our pieces complete the moment with poise.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8DFC8]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              <Leaf className="w-4 h-4" />
              <span>Cosmetics & Beauty</span>
            </div>
            <h3 className="font-serif text-xl text-[#292522] mb-3">Thoughtful Botanical Formulations</h3>
            <p className="text-xs sm:text-sm text-[#292522]/75 leading-relaxed">
              We believe in honest, transparent skincare and cosmetic formulations. From Kashmiri saffron face elixirs to velvety lipsticks and mineral kajal, our products complement your natural radiance without unsubstantiated claims.
            </p>
          </div>

        </div>

        {/* 3. Vision for the Future */}
        <div className="p-8 bg-[#EFE5D4] border border-[#D5C6AF] mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#292522] mb-4">
            Our Vision for the Future
          </h2>
          <p className="text-sm sm:text-base text-[#292522]/80 leading-relaxed font-normal mb-6">
            We are dedicated to building a sustainable ecosystem where generational artisans receive transparent remuneration, fair recognition, and creative autonomy. As Monvi Art expands, our mission remains anchored: preserving India’s magnificent artistic vernacular while crafting objects that feel effortlessly natural in the modern home.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigateView('collection', 'all')}
              className="px-6 py-3 bg-[#641F2A] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#7D2836] transition-colors"
            >
              Explore Our Collections
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3 bg-white border border-[#D5C6AF] text-[#292522] text-xs font-semibold uppercase tracking-wider hover:border-[#641F2A] transition-colors"
            >
              Contact Our Studio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
