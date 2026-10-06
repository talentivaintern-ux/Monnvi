import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

export const Header: React.FC = () => {
  const {
    cartItemsCount,
    wishlist,
    activeView,
    selectedCategory,
    navigateView,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAccountOpen,
    setIsContactOpen,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: 'home' | 'collection' | 'about'; category?: ProductCategory }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Madhubani Art', view: 'collection', category: 'madhubani' },
    { label: 'Metal Home Decor', view: 'collection', category: 'metal-decor' },
    { label: 'Imitation Jewellery', view: 'collection', category: 'jewellery' },
    { label: 'Cosmetics & Beauty', view: 'collection', category: 'beauty' },
    { label: 'About Us', view: 'about' },
  ];

  const handleNavClick = (view: 'home' | 'collection' | 'about', category?: ProductCategory) => {
    navigateView(view, category || 'all');
    setMobileMenuOpen(false);
  };

  const isNavActive = (view: string, category?: ProductCategory) => {
    if (view === 'home' && activeView === 'home') return true;
    if (view === 'about' && activeView === 'about') return true;
    if (view === 'collection' && activeView === 'collection' && selectedCategory === category) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F3EA]/95 backdrop-blur-md border-b border-[#E8DFC8]/70 transition-all">
      {/* Announcement Bar */}
      <div className="bg-[#641F2A] text-[#F8F3EA] text-xs py-2 px-4 tracking-wider text-center font-normal flex items-center justify-center gap-4 border-b border-[#521720]">
        <span className="hidden sm:inline opacity-80 text-[11px] uppercase tracking-widest font-sans">
          Festive Special
        </span>
        <span className="font-serif italic text-sm tracking-normal">
          “Discover Art. Embrace Beauty. Elevate Your Everyday.”
        </span>
        <span className="hidden md:inline text-[11px] opacity-80 border-l border-[#F8F3EA]/30 pl-3">
          Complimentary insured shipping on orders over ₹999
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#292522] hover:text-[#641F2A] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Zone 1: Logo Wordmark */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button
              onClick={() => navigateView('home')}
              className="group inline-flex flex-col items-center lg:items-start text-left focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] uppercase font-semibold text-[#292522] group-hover:text-[#641F2A] transition-colors">
                Monvi Art
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-[#B08D57] -mt-1 font-medium font-sans">
                Art · Beauty · Living
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium tracking-wider uppercase text-[#292522]">
            {navItems.map((item) => {
              const active = isNavActive(item.view, item.category);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view, item.category)}
                  className={`relative py-2 transition-colors hover:text-[#641F2A] ${
                    active ? 'text-[#641F2A] font-semibold' : 'text-[#292522]/80'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#641F2A] rounded-full" />
                  )}
                </button>
              );
            })}
            
            <button
              onClick={() => setIsContactOpen(true)}
              className="py-2 text-[#292522]/80 hover:text-[#641F2A] transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#292522] hover:text-[#641F2A] transition-colors focus:outline-none"
              aria-label="Search Monvi Art"
              title="Search catalog"
            >
              <Search className="w-5 h-5 stroke-[1.6]" />
            </button>

            {/* Account */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="p-2 text-[#292522] hover:text-[#641F2A] transition-colors focus:outline-none"
              aria-label="Account Profile & Orders"
              title="My Account"
            >
              <User className="w-5 h-5 stroke-[1.6]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-[#292522] hover:text-[#641F2A] transition-colors focus:outline-none"
              aria-label="Saved Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.6]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#A65D45] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#292522] hover:text-[#641F2A] transition-colors focus:outline-none"
              aria-label="Shopping Cart Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#641F2A] text-[#F8F3EA] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[113px] bottom-0 bg-[#F8F3EA] border-t border-[#E8DFC8] z-50 overflow-y-auto px-6 py-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <div className="text-[11px] uppercase tracking-widest text-[#B08D57] font-semibold pb-1 border-b border-[#E8DFC8]">
              Browse Collections
            </div>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view, item.category)}
                className="flex items-center justify-between text-left py-2.5 text-base font-serif text-[#292522] hover:text-[#641F2A] border-b border-[#F0E6D5]"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-[#B08D57]" />
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsContactOpen(true);
              }}
              className="flex items-center justify-between text-left py-2.5 text-base font-serif text-[#292522] hover:text-[#641F2A] border-b border-[#F0E6D5]"
            >
              <span>Contact & Concierge</span>
              <ArrowRight className="w-4 h-4 text-[#B08D57]" />
            </button>

            <div className="pt-6 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="w-full py-3 px-4 bg-[#292522] text-[#F8F3EA] text-xs uppercase tracking-widest font-semibold hover:bg-[#641F2A] transition-colors"
              >
                My Account & Order History
              </button>
              <div className="text-center text-xs text-[#292522]/60 pt-2 font-serif italic">
                “Art, Beauty & Living. Elegance in Every Detail.”
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
