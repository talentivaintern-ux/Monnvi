import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const SocialEdit: React.FC = () => {
  const editorialShots = [
    {
      id: 1,
      image: '/src/assets/images/hero_monvi_art_lifestyle_1791299604226.jpg',
      tag: '#MonviLiving',
      caption: 'Morning light across our Mayura brass urli bowl and handwoven textures.',
    },
    {
      id: 2,
      image: '/src/assets/images/category_madhubani_art_1791299618279.jpg',
      tag: '#MithilaArtistry',
      caption: 'Fine nib strokes bringing the Tree of Life alive with mineral pigments.',
    },
    {
      id: 3,
      image: '/src/assets/images/category_jewellery_1791299644073.jpg',
      tag: '#MonviAdorned',
      caption: 'Layered Basra pearls and uncut Kundan elegance for festive evenings.',
    },
    {
      id: 4,
      image: '/src/assets/images/category_beauty_1791299659700.jpg',
      tag: '#CleanRituals',
      caption: 'A golden drop of Kashmiri saffron elixir for an effortless everyday glow.',
    },
    {
      id: 5,
      image: '/src/assets/images/category_metal_decor_1791299631403.jpg',
      tag: '#SacredSpaces',
      caption: 'The gentle aroma of sambrani rising from our sculpted Kamala lotus burner.',
    },
    {
      id: 6,
      image: '/fae2be4e05f7abcfebe9184c83ac3d9d.jpg',
      tag: '#EverydayLuxury',
      caption: 'Velvet pigments and mindful beauty essentials arranged with intention.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F4ECE0] border-b border-[#E0D4C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.22em] text-[#B08D57] font-semibold">
            Social Editorial
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292522] mt-2 mb-3">
            The Monvi Art Edit
          </h2>
          <p className="text-sm sm:text-base text-[#292522]/70 font-normal">
            Art, beauty and living — styled your way.
          </p>
        </div>

        {/* 6-Image Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {editorialShots.map((shot) => (
            <div
              key={shot.id}
              className="group relative aspect-square overflow-hidden bg-[#E2D5C3] cursor-pointer"
            >
              <img
                src={shot.image}
                alt={shot.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Scrim and Hover Information */}
              <div className="absolute inset-0 bg-[#292522]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-left">
                <div className="flex items-center justify-between text-[#F8F3EA]">
                  <Instagram className="w-4 h-4 text-[#B08D57]" />
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F8F3EA]/70" />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-wider text-[#B08D57] mb-1">
                    {shot.tag}
                  </div>
                  <p className="text-[11px] text-[#F8F3EA]/90 line-clamp-3 leading-snug">
                    {shot.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-[#D5C6AF] hover:border-[#641F2A] hover:bg-[#641F2A] hover:text-[#F8F3EA] text-xs font-semibold uppercase tracking-[0.16em] text-[#292522] transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow Monvi Art</span>
          </a>
        </div>

      </div>
    </section>
  );
};
