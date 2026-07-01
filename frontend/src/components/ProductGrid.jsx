import { useState, useEffect } from 'react';

export default function ProductGrid({ addToCart }) {
  // 1. State for our dynamic data
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch data when the component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to connect to the dairy backend.');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("We are having trouble loading the fresh products right now. Please try again later.");
        setIsLoading(false);
      });
  }, []); // The empty array ensures this only runs once when the grid loads

  return (
    <section className="py-20 px-6 md:px-16 bg-creme">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-wood-dark mb-4">Farm Fresh Products</h2>
          <p className="text-lg text-wood-light max-w-2xl mx-auto">
            From our dairy to your doorstep. Every drop is carefully tested to ensure your family gets nothing but the best.
          </p>
        </div>

        {/* 3. Handle Loading and Error States Gracefully */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-heritage-red border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-wood-dark font-medium">Fetching fresh inventory...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 bg-heritage-red/10 border border-heritage-red rounded-xl">
            <p className="text-heritage-red font-bold">{error}</p>
          </div>
        )}

        {/* 4. Render the dynamic products */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-creme-light border border-[#e5dfd3] rounded-xl p-8 shadow-sm flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-wood-light uppercase tracking-wider">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="bg-heritage-red/10 text-heritage-red text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-wood-dark mb-3">
                  {product.name}
                </h3>
                
                <p className="text-wood-light mb-8 flex-grow">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#e5dfd3]">
                  {/* Note: product.price from Django comes as a string, parse it if needed for math, but it renders fine here */}
                  <span className="text-xl font-bold text-heritage-red">
                    ₹{product.price} <span className="text-sm text-wood-light">/ {product.unit}</span>
                  </span>
                  
                  <button 
                    // Make sure to parse the price to a float so the Cart math still works!
                    onClick={() => addToCart({ ...product, price: parseFloat(product.price) })}
                    className="bg-wood-dark text-creme-light px-5 py-2 rounded-md font-medium hover:bg-heritage-red transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}