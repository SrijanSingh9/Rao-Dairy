import { useState } from 'react';

export default function CartSidebar({ isOpen, toggleCart, cartItems, clearCart, updateQuantity }) {
  const [view, setView] = useState('cart'); 
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  
  // NEW: State for handling network requests
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // UPDATE: Real network request to Django
  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCheckoutError(null);
    
    // Construct the payload exactly how Django expects it
    const payload = {
      customer_name: formData.name,
      customer_phone: formData.phone,
      delivery_address: formData.address,
      total_amount: cartTotal,
      cart_items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity }))
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order. Please try again.');
      }

      const data = await response.json();
      console.log("Order Successful:", data);
      
      // Transition to success screen and clear the cart
      setView('success');
      clearCart();
      
    } catch (err) {
      console.error("Checkout Error:", err);
      setCheckoutError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    toggleCart();
    setTimeout(() => {
      setView('cart');
      setFormData({ name: '', phone: '', address: '' });
      setCheckoutError(null);
    }, 300); 
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-wood-dark/50 z-40 transition-opacity" onClick={handleClose}></div>
      )}

      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-creme-light shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        <div className="p-6 border-b border-[#e5dfd3] flex justify-between items-center bg-creme">
          <h2 className="text-2xl font-bold text-wood-dark">
            {view === 'cart' && 'Your Order'}
            {view === 'checkout' && 'Checkout'}
            {view === 'success' && 'Order Confirmed'}
          </h2>
          <button onClick={handleClose} className="text-wood-light hover:text-heritage-red text-2xl font-bold">×</button>
        </div>

        {/* View 1: Cart Details */}
        {view === 'cart' && (
          <>
            <div className="flex-grow p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-wood-light text-center mt-10">Your cart is empty.</p>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center pb-4 border-b border-[#e5dfd3]/50">
                      <div>
                        <h4 className="font-bold text-wood-dark">{item.name}</h4>
                        <div className="text-sm text-wood-light mb-2">₹{item.price} / {item.unit}</div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-creme-light border border-[#e5dfd3] text-wood-dark hover:bg-heritage-red hover:text-creme-light hover:border-heritage-red transition-all shadow-sm">−</button>
                          <span className="font-bold text-wood-dark w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-creme-light border border-[#e5dfd3] text-wood-dark hover:bg-heritage-red hover:text-creme-light hover:border-heritage-red transition-all shadow-sm">+</button>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-heritage-red text-right">₹{item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-6 border-t border-[#e5dfd3] bg-creme">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-wood-dark">Total</span>
                <span className="text-2xl font-bold text-heritage-red">₹{cartTotal}</span>
              </div>
              <button onClick={() => setView('checkout')} disabled={cartItems.length === 0} className="w-full bg-heritage-red text-creme-light py-4 rounded-md font-medium hover:bg-heritage-red-hover transition-colors disabled:bg-wood-light disabled:cursor-not-allowed">Enter Delivery Details</button>
            </div>
          </>
        )}

        {/* View 2: Checkout Form */}
        {view === 'checkout' && (
          <form onSubmit={handleCheckout} className="flex flex-col h-full">
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              
              {/* Show error message if API fails */}
              {checkoutError && (
                <div className="p-3 bg-heritage-red/10 border border-heritage-red text-heritage-red rounded-md text-sm font-medium mb-4">
                  {checkoutError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border border-[#e5dfd3] rounded-md bg-creme-light text-wood-dark focus:outline-none focus:ring-2 focus:ring-heritage-red" placeholder="Rahul Sharma" />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 border border-[#e5dfd3] rounded-md bg-creme-light text-wood-dark focus:outline-none focus:ring-2 focus:ring-heritage-red" placeholder="+91 9876543210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Delivery Address</label>
                <textarea required name="address" value={formData.address} onChange={handleInputChange} rows="3" className="w-full p-3 border border-[#e5dfd3] rounded-md bg-creme-light text-wood-dark focus:outline-none focus:ring-2 focus:ring-heritage-red" placeholder="House No, Street, Landmark..."></textarea>
              </div>
              <div className="mt-4 p-4 bg-creme rounded-md border border-[#e5dfd3]">
                <p className="text-sm text-wood-dark flex justify-between"><span>Amount to Pay (Cash):</span> <span className="font-bold text-heritage-red">₹{cartTotal}</span></p>
              </div>
            </div>
            
            <div className="p-6 border-t border-[#e5dfd3] bg-creme flex gap-3">
              <button type="button" onClick={() => setView('cart')} className="w-1/3 border-2 border-wood-dark text-wood-dark py-4 rounded-md font-medium hover:bg-wood-dark hover:text-creme transition-colors disabled:opacity-50">Back</button>
              
              <button type="submit" disabled={isSubmitting} className="w-2/3 bg-heritage-red text-creme-light py-4 rounded-md font-medium hover:bg-heritage-red-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-creme-light border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : 'Place Order'}
              </button>
            </div>
          </form>
        )}

        {/* View 3: Success Screen */}
        {view === 'success' && (
          <div className="flex-grow p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-heritage-red/10 text-heritage-red rounded-full flex items-center justify-center text-3xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-wood-dark mb-2">Thank You!</h3>
            <p className="text-wood-light mb-8">Your order has been safely received. We will deliver your fresh milk shortly.</p>
            <button onClick={handleClose} className="bg-wood-dark text-creme-light px-8 py-3 rounded-md font-medium hover:bg-heritage-red transition-colors">Continue Shopping</button>
          </div>
        )}

      </div>
    </>
  );
}