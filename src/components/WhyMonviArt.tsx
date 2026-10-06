import React from 'react';
import { Sparkles, Compass, Gem, HeartHandshake } from 'lucide-react';

export const WhyMonviArt: React.FC = () => {
  const values = [
    {
      icon: Sparkles,
      title: 'Curated With Care',
      description: 'Thoughtfully selected products that balance beauty, quality and individuality across art, decor, jewellery, and beauty.',
    },
    {
      icon: Compass,
      title: 'Inspired by India',
      description: 'Collections deeply influenced by India’s millennia-old artistic, architectural, and cultural heritage, reimagined for contemporary living.',
    },
    {
      icon: Gem,
      title: 'Crafted for Everyday Luxury',
      description: 'Beautiful, durable pieces designed to elevate your everyday spaces, styles, and rituals rather than stay locked away for occasions.',
    },
    {
      icon: HeartHandshake,
      title: 'A Celebration of Artisans',
      description: 'Authentic partnerships with traditional Mithila painters, Moradabad metalsmiths, and Rajasthani jewellery karigars.',
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#F5EFE4] border-b border-[#E3D7C1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.22em] text-[#B08D57] font-semibold">
            The Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292522] mt-2 mb-3">
            Why Monvi Art?
          </h2>
          <p className="text-sm text-[#292522]/70 font-normal">
            Bridging timeless regional craftsmanship with the aesthetics of refined modern lifestyles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="bg-white p-8 border border-[#E8DFC8] flex flex-col items-start transition-all hover:border-[#B08D57] hover:shadow-md"
              >
                <div className="w-12 h-12 bg-[#F8F3EA] border border-[#E8DFC8] flex items-center justify-center text-[#641F2A] mb-6">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-[#292522] mb-3 font-medium">
                  {v.title}
                </h3>
                <p className="text-xs text-[#292522]/75 leading-relaxed font-normal">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
