import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Instagram, Facebook, Youtube, Pin, ArrowRight, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { navigateView, setIsContactOpen, setIsAccountOpen, showToast } = useShop();
  const [footerEmail, setFooterEmail] = useState('');

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail) {
      showToast('Subscribed to Monvi Art updates.', 'success');
      setFooterEmail('');
    }
  };

  return (
    <footer className="bg-[#292522] text-[#F8F3EA] border-t border-[#3D3733]">
      
      {/* Trust Ribbon Above Columns */}
      <div className="border-b border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#B08D57]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase font-semibold tracking-wider text-[#F8F3EA]">
                  Insured Pan-India Delivery
                </div>
                <div className="text-[11px] text-[#EFE5D4]/60">
                  Complimentary on all orders over ₹999
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#B08D57]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase font-semibold tracking-wider text-[#F8F3EA]">
                  7-Day Seamless Exchange
                </div>
                <div className="text-[11px] text-[#EFE5D4]/60">
                  Hassle-free support for craft integrity
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#B08D57]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase font-semibold tracking-wider text-[#F8F3EA]">
                  Authentic Artisan Provenance
                </div>
                <div className="text-[11px] text-[#EFE5D4]/60">
                  Certified Indian craft clusters
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="mb-4">
              <span className="font-serif text-2xl tracking-[0.16em] uppercase font-semibold text-[#F8F3EA]">
                Monvi Art
              </span>
              <p className="font-serif italic text-sm text-[#B08D57] mt-1">
                Art, Beauty & Living. Elegance in Every Detail.
              </p>
            </div>
            
            <p className="text-xs text-[#EFE5D4]/75 leading-relaxed font-normal mb-6 max-w-sm">
              Monvi Art celebrates India's enduring heritage through authentic Madhubani paintings, handcrafted metal home accents, timeless jewellery, and thoughtful everyday beauty essentials.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 text-[#EFE5D4]/80">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/15 flex items-center justify-center hover:text-[#B08D57] hover:border-[#B08D57] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/15 flex items-center justify-center hover:text-[#B08D57] hover:border-[#B08D57] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/15 flex items-center justify-center hover:text-[#B08D57] hover:border-[#B08D57] transition-colors"
                aria-label="Pinterest"
              >
                <Pin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/15 flex items-center justify-center hover:text-[#B08D57] hover:border-[#B08D57] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57] mb-5">
              Shop
            </h4>
            <ul className="space-y-3 text-xs text-[#EFE5D4]/80 font-normal">
              <li>
                <button
                  onClick={() => navigateView('collection', 'madhubani')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Madhubani Art
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateView('collection', 'metal-decor')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Metal Home Decor
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateView('collection', 'jewellery')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Imitation Jewellery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateView('collection', 'beauty')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Cosmetics & Beauty
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateView('collection', 'all')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57] mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-xs text-[#EFE5D4]/80 font-normal">
              <li>
                <button
                  onClick={() => navigateView('about')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateView('about')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Artisan Collective
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57] mb-5">
              Customer Care
            </h4>
            <ul className="space-y-3 text-xs text-[#EFE5D4]/80 font-normal">
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Return & Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57] mb-5">
              Newsletter
            </h4>
            <p className="text-xs text-[#EFE5D4]/70 mb-4 font-normal">
              Join the Monvi Art community.
            </p>
            <form onSubmit={handleFooterSubscribe} className="space-y-2">
              <input
                type="email"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 text-xs text-[#F8F3EA] placeholder-white/40 focus:outline-none focus:border-[#B08D57]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#641F2A] hover:bg-[#7D2836] text-[#F8F3EA] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#EFE5D4]/60">
          <div>
            © {new Date().getFullYear()} Monvi Art. All rights reserved. Crafting Your Everyday Luxury.
          </div>

          {/* Payment Badges (Clean text/labels) */}
          <div className="flex items-center gap-3 text-[11px] font-mono text-[#EFE5D4]/75 uppercase tracking-wider">
            <span className="px-2 py-0.5 border border-white/20 rounded-xs">UPI</span>
            <span className="px-2 py-0.5 border border-white/20 rounded-xs">Visa</span>
            <span className="px-2 py-0.5 border border-white/20 rounded-xs">Mastercard</span>
            <span className="px-2 py-0.5 border border-white/20 rounded-xs">RuPay</span>
            <span className="px-2 py-0.5 border border-white/20 rounded-xs">NetBanking</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
