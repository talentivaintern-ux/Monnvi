import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductCategory, OrderDetails } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface Coupon {
  code: string;
  discountPercent: number;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  activeView: 'home' | 'collection' | 'pdp' | 'about' | 'contact';
  selectedCategory: ProductCategory | 'all';
  selectedProduct: Product | null;
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isCheckoutOpen: boolean;
  isContactOpen: boolean;
  isAccountOpen: boolean;
  searchQuery: string;
  appliedCoupon: Coupon | null;
  toasts: ToastState[];
  orders: OrderDetails[];
  
  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  viewProductDetail: (product: Product) => void;
  navigateView: (view: 'home' | 'collection' | 'pdp' | 'about' | 'contact', category?: ProductCategory | 'all') => void;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsContactOpen: (open: boolean) => void;
  setIsAccountOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: number) => void;
  completeOrder: (orderDetails: OrderDetails) => void;
  
  // Computed values
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  cartItemsCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('monvi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('monvi_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('monvi_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeView, setActiveView] = useState<'home' | 'collection' | 'pdp' | 'about' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('monvi_cart', JSON.stringify(cart));
    } catch {
      // Storage error silent catch
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('monvi_wishlist', JSON.stringify(wishlist));
    } catch {
      // Storage error silent catch
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('monvi_orders', JSON.stringify(orders));
    } catch {
      // Storage error silent catch
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from your wishlist.`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to your wishlist.`);
        return [...prev, product.id];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const viewProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateView = (
    view: 'home' | 'collection' | 'pdp' | 'about' | 'contact',
    category?: ProductCategory | 'all'
  ) => {
    if (category !== undefined) {
      setSelectedCategory(category);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'MONVI10' || cleanCode === 'WELCOME10') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 10 });
      showToast('10% Luxury Welcome coupon applied!', 'success');
      return { success: true, message: '10% discount applied!' };
    } else if (cleanCode === 'GLOW15' || cleanCode === 'HERITAGE15') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 15 });
      showToast('15% Artisan Special discount applied!', 'success');
      return { success: true, message: '15% discount applied!' };
    } else {
      showToast('Invalid coupon code. Try MONVI10 or GLOW15', 'error');
      return { success: false, message: 'Invalid coupon code.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  const completeOrder = (orderDetails: OrderDetails) => {
    setOrders((prev) => [orderDetails, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);
    showToast('Your Monvi Art order has been placed successfully!', 'success');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;
  // Free delivery threshold ₹999
  const cartShipping = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 150;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        activeView,
        selectedCategory,
        selectedProduct,
        quickViewProduct,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        isCheckoutOpen,
        isContactOpen,
        isAccountOpen,
        searchQuery,
        appliedCoupon,
        toasts,
        orders,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        openQuickView,
        closeQuickView,
        viewProductDetail,
        navigateView,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        setIsCheckoutOpen,
        setIsContactOpen,
        setIsAccountOpen,
        setSearchQuery,
        applyCoupon,
        removeCoupon,
        showToast,
        removeToast,
        completeOrder,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        cartItemsCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
