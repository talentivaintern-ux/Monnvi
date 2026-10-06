import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Welcome to the Monvi Art circle. Enjoy 10% off with code MONVI10', 'success');
  };

  return (
    <section className="py-20 lg:py-24 bg-[#EFE5D4] border-b border-[#D8C7AF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle Motif */}
        <div className="w-10 h-10 mx-auto mb-6 bg-white border border-[#D5C6AF] flex items-center justify-center text-[#641F2A]">
          <Mail className="w-4 h-4" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292522] mb-4 font-normal">
          A Little More Beauty in Your Inbox.
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#292522]/75 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
          Be the first to discover new collections, artistic finds, exclusive offers and stories from Monvi Art.
        </p>

        {/* Subscription Form */}
        {isSubscribed ? (
          <div className="max-w-md mx-auto p-4 bg-white border border-[#B08D57] flex items-center justify-center gap-3 text-sm text-[#292522]">
            <CheckCircle2 className="w-5 h-5 text-[#B08D57]" />
            <span className="font-medium">Thank you for joining our community! Use code <strong>MONVI10</strong> at checkout.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3.5 bg-white border border-[#D5C6AF] text-sm text-[#292522] placeholder-[#292522]/50 focus:outline-none focus:border-[#641F2A] transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#641F2A] hover:bg-[#7E2937] text-[#F8F3EA] text-xs font-semibold uppercase tracking-[0.16em] transition-colors whitespace-nowrap shadow-xs"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#292522]/55 mt-4">
          We respect your privacy. Unsubscribe at any time. No spam, only beauty.
        </p>

      </div>
    </section>
  );
};
