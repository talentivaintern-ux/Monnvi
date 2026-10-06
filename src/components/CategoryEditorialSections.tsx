import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowRight, Compass, Sparkles, Feather, ShieldCheck } from 'lucide-react';

export const CategoryEditorialSections: React.FC = () => {
  const { navigateView } = useShop();

  const madhubaniProducts = PRODUCTS.filter((p) => p.category === 'madhubani').slice(0, 3);
  const metalProducts = PRODUCTS.filter((p) => p.category === 'metal-decor').slice(0, 3);
  const jewelleryProducts = PRODUCTS.filter((p) => p.category === 'jewellery').slice(0, 3);
  const beautyProducts = PRODUCTS.filter((p) => p.category === 'beauty').slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* 1. MADHUBANI ART SECTION */}
      <section className="py-20 lg:py-28 bg-[#F5EFE4] border-b border-[#E3D7C1] relative overflow-hidden">
        {/* Subtle decorative fine-line border accent */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Story Editorial Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#A65D45] mb-4">
                <Feather className="w-4 h-4 text-[#A65D45]" />
                <span>Mithila Heritage</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl text-[#292522] leading-tight mb-6">
                Where Every Brushstroke Tells a Story.
              </h2>

              <p className="text-base text-[#292522]/80 leading-relaxed mb-6 font-normal">
                “Rooted in the artistic traditions of Mithila, Madhubani art transforms mythology, nature and everyday stories into intricate patterns and expressive forms.”
              </p>

              <div className="space-y-3 mb-8 text-xs text-[#292522]/75 font-normal">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A65D45]" />
                  <span>Handmade Khadi cotton paper with natural plant & mineral dyes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A65D45]" />
                  <span>Drawn with fine bamboo nibs in authentic Kachni & Bharni styles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A65D45]" />
                  <span>Certified artisan provenance with direct craft cluster support</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigateView('collection', 'madhubani')}
                  className="px-8 py-3.5 bg-[#292522] text-[#F8F3EA] hover:bg-[#641F2A] text-xs font-semibold uppercase tracking-[0.16em] transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Madhubani Art</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Showcase Artworks Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {madhubaniProducts.slice(0, 2).map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. METAL HOME DECOR SECTION */}
      <section className="py-20 lg:py-28 bg-[#F8F3EA] border-b border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.22em] text-[#B08D57] font-semibold">
              Brass, Bell Metal & Bronze
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#292522] mt-2 mb-4">
              Bring Timeless Craftsmanship Home.
            </h2>
            <p className="text-base text-[#292522]/80 leading-relaxed">
              “Discover elegant metal décor designed to add warmth, character and a touch of heritage to contemporary spaces.”
            </p>
          </div>

          {/* Curated Subcategories Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
            {[
              'Decorative Idols',
              'Metal Vases',
              'Urli Bowls',
              'Decorative Objects',
              'Wall Décor',
              'Traditional Accents',
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => navigateView('collection', 'metal-decor')}
                className="py-3 px-2 text-center bg-white border border-[#E8DFC8] text-xs text-[#292522] hover:border-[#B08D57] hover:text-[#641F2A] transition-all font-medium"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 3 Selected Metal Decor Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {metalProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigateView('collection', 'metal-decor')}
              className="px-8 py-3.5 bg-[#641F2A] text-[#F8F3EA] hover:bg-[#7E2937] text-xs font-semibold uppercase tracking-[0.16em] transition-colors inline-flex items-center gap-2"
            >
              <span>Shop Home Decor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. JEWELLERY SECTION */}
      <section className="py-20 lg:py-28 bg-[#F4ECE0] border-b border-[#DFD3C2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Products Column */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {jewelleryProducts.slice(0, 2).map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>

            {/* Story Column */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#B08D57] mb-4">
                <Sparkles className="w-4 h-4 text-[#B08D57]" />
                <span>Adornment & Radiance</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#292522] leading-tight mb-6">
                Jewellery That Completes the Moment.
              </h2>

              <p className="text-base text-[#292522]/80 leading-relaxed mb-6 font-normal">
                “From statement pieces to effortless everyday elegance, discover jewellery designed to make every occasion feel special.”
              </p>

              {/* Sub-item categories */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  'Earrings',
                  'Jhumkas',
                  'Necklaces',
                  'Kundan-inspired sets',
                  'Rings',
                  'Bracelets',
                  'Bangles / Kada',
                ].map((item) => (
                  <span
                    key={item}
                    className="text-xs text-[#292522]/80 bg-white/70 px-2.5 py-1 border border-[#DFD3C2]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div>
                <button
                  onClick={() => navigateView('collection', 'jewellery')}
                  className="px-8 py-3.5 bg-[#292522] text-[#F8F3EA] hover:bg-[#641F2A] text-xs font-semibold uppercase tracking-[0.16em] transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Jewellery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. BEAUTY SECTION */}
      <section className="py-20 lg:py-28 bg-[#F8F3EA] border-b border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.22em] text-[#641F2A] font-semibold">
              Botanical & Mineral Formulations
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#292522] mt-2 mb-4">
              Your Beauty. Your Expression.
            </h2>
            <p className="text-base text-[#292522]/80 leading-relaxed">
              “Explore beauty essentials created to complement your everyday rituals, from statement makeup to nourishing skincare.”
            </p>
          </div>

          {/* Clean factual categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
            {[
              'Lipsticks',
              'Foundation',
              'Concealers',
              'Eyeliners',
              'Eye Palettes',
              'Skincare',
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => navigateView('collection', 'beauty')}
                className="py-3 px-2 text-center bg-white border border-[#E8DFC8] text-xs text-[#292522] hover:border-[#641F2A] hover:text-[#641F2A] transition-all font-medium"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 3 Selected Beauty Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {beautyProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigateView('collection', 'beauty')}
              className="px-8 py-3.5 bg-[#641F2A] text-[#F8F3EA] hover:bg-[#7E2937] text-xs font-semibold uppercase tracking-[0.16em] transition-colors inline-flex items-center gap-2"
            >
              <span>Shop Beauty</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
