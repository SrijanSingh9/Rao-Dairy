import { useState, useEffect } from 'react';import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutGuarantee from './components/AboutGuarantee';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import OwnerDashboard from './components/OwnerDashboard'; // IMPORT THE DASHBOARD

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOwnerView, setIsOwnerView] = useState(false);
  useEffect(() => {
    // If the URL is http://localhost:5173/?view=owner, show the dashboard
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('view') === 'owner') {
      setIsOwnerView(true);
    }
  }, []);
  const handleAddToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };
  const updateQuantity = (productId, delta) => {
    setCartItems((prevCart) => {
      return prevCart.map(item => {
        if (item.id === productId) {
          // Add the delta (which will be +1 or -1)
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      }).filter(item => item.quantity > 0); // Instantly remove the item if it hits 0
    });
  };
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const clearCart = () => setCartItems([]);
  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  if (isOwnerView) {
    return <OwnerDashboard />;
  }
  return (
    <main className="relative min-h-screen">
      
      {/* The New Sticky Navbar */}
      <Navbar toggleCart={toggleCart} totalItemsCount={totalItemsCount} />

      {/* Landing Page Content */}
      <Hero />
      <AboutGuarantee />
      
      {/* Added id="products" so the Hero button can scroll here */}
      <div id="products">
        <ProductGrid addToCart={handleAddToCart} />
      </div>
      
      {/* The Interactive Cart */}
      <CartSidebar 
        isOpen={isCartOpen} 
        toggleCart={toggleCart} 
        cartItems={cartItems} 
        clearCart={clearCart} 
        updateQuantity={updateQuantity}
      />
    </main>
  );
}

export default App;