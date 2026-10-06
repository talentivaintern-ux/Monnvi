import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandIntro } from './components/BrandIntro';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FeaturedCollection } from './components/FeaturedCollection';
import { CategoryEditorialSections } from './components/CategoryEditorialSections';
import { WhyMonviArt } from './components/WhyMonviArt';
import { NewArrivals } from './components/NewArrivals';
import { SocialEdit } from './components/SocialEdit';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CollectionPage } from './components/CollectionPage';
import { ProductDetail } from './components/ProductDetail';
import { AboutUsPage } from './components/AboutUsPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { AccountModal } from './components/AccountModal';
import { ToastContainer } from './components/Toast';

const MainLayout: React.FC = () => {
  const { activeView } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F3EA] text-[#292522]">
      {/* Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <BrandIntro />
            <CategoryShowcase />
            <FeaturedCollection />
            <CategoryEditorialSections />
            <WhyMonviArt />
            <NewArrivals />
            <SocialEdit />
            <Testimonials />
            <Newsletter />
          </>
        )}

        {activeView === 'collection' && (
          <>
            <CollectionPage />
            <Newsletter />
          </>
        )}

        {activeView === 'pdp' && (
          <>
            <ProductDetail />
            <Newsletter />
          </>
        )}

        {activeView === 'about' && (
          <>
            <AboutUsPage />
            <Newsletter />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-out Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer />
      <QuickViewModal />
      <SearchModal />
      <ContactModal />
      <AccountModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
