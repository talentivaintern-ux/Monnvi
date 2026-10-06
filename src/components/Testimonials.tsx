import React from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F3EA] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.22em] text-[#B08D57] font-semibold">
            Patron Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292522] mt-2 mb-3">
            Loved by Those Who Choose Beauty
          </h2>
          <p className="text-sm text-[#292522]/70 font-normal">
            Reflections from patrons who invite Indian craftsmanship and mindful luxury into their homes.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 sm:p-10 border border-[#E8DFC8] flex flex-col justify-between shadow-xs relative hover:border-[#B08D57] transition-all"
            >
              <div>
                {/* Subtle Quote icon */}
                <Quote className="w-8 h-8 text-[#EADDC9] mb-4 stroke-[1.2]" />

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B08D57] text-[#B08D57]" />
                  ))}
                </div>

                {/* Review Title */}
                <h3 className="font-serif text-lg font-medium text-[#292522] mb-3 leading-snug">
                  “{t.title}”
                </h3>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-[#292522]/75 leading-relaxed font-normal mb-6">
                  {t.comment}
                </p>
              </div>

              {/* Patron Info */}
              <div className="pt-6 border-t border-[#F5EFE6]">
                <div className="font-serif text-base font-semibold text-[#292522]">
                  {t.author}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#292522]/60 mt-0.5">
                  <span>{t.location}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#641F2A] font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Verified Patron
                  </span>
                </div>
                {t.productName && (
                  <div className="text-[10px] text-[#B08D57] mt-1 font-mono tracking-wide">
                    Item: {t.productName}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
