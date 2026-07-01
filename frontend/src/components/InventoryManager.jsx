import { useState, useEffect } from 'react';

export default function InventoryManager() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // States for toggling forms
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // State for a new product
  const initialNewProduct = { name: '', category: 'Milk', description: '', price: '', unit: 'Liter', badge: '' };
  const [newProduct, setNewProduct] = useState(initialNewProduct);

  const fetchProducts = () => {
    fetch('http://127.0.0.1:8000/api/products/?all=true')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/products/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        fetchProducts();
        setShowAddForm(false);
        setNewProduct(initialNewProduct);
      } else {
        alert("Check all details / कृपया सभी जानकारी सही से भरें");
      }
    } catch (error) {
      alert("Error adding product / जोड़ने में त्रुटि");
    }
  };

  // UPDATE an existing product
  const updateProduct = async (id, updates) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        fetchProducts();
        setEditingId(null); // Close edit mode on success
      }
    } catch (error) {
      alert("Error updating / अपडेट करने में त्रुटि");
    }
  };

  // Start editing a specific product
  const startEditing = (product) => {
    setEditingId(product.id);
    setEditFormData(product);
  };

  if (isLoading) return <div className="p-8 text-center text-xl text-wood-dark">Loading... / लोड हो रहा है...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6 mt-4 pb-12">
      
      {/* ADD PRODUCT BUTTON / FORM */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e5dfd3]">
        {!showAddForm ? (
          <button 
            onClick={() => setShowAddForm(true)}
            className="w-full bg-heritage-red text-creme-light py-3 rounded-lg font-bold hover:bg-heritage-red-hover transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span> Add New Product (नया सामान जोड़ें)
          </button>
        ) : (
          <form onSubmit={handleAddProduct} className="space-y-4">
            <h3 className="font-bold text-lg text-wood-dark border-b pb-2 mb-4">Add Product / नया सामान</h3>
            
            <input required type="text" placeholder="Name (नाम) e.g., Pure Cow Ghee" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full p-3 border rounded" />
            
            <div className="flex gap-4">
              <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-1/2 p-3 border rounded bg-white">
                <option value="Milk">Milk (दूध)</option>
                <option value="Homemade Ghee">Ghee (घी)</option>
              </select>
              <input type="text" placeholder="Badge e.g., A2 Pure" value={newProduct.badge} onChange={e => setNewProduct({...newProduct, badge: e.target.value})} className="w-1/2 p-3 border rounded" />
            </div>

            <textarea required placeholder="Description (विवरण)" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} rows="2" className="w-full p-3 border rounded"></textarea>
            
            <div className="flex gap-4">
              <input required type="number" placeholder="Price (दाम) ₹" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-1/2 p-3 border rounded" />
              <select value={newProduct.unit} onChange={e => setNewProduct({...newProduct, unit: e.target.value})} className="w-1/2 p-3 border rounded bg-white">
                <option value="Liter">Liter (लीटर)</option>
                <option value="Kg">Kg (किलो)</option>
                <option value="Pack">Pack (पैकेट)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="w-1/2 border-2 border-wood-dark text-wood-dark py-3 rounded font-bold">Cancel / रद्द करें</button>
              <button type="submit" className="w-1/2 bg-green-600 text-white py-3 rounded font-bold">Save / सेव करें</button>
            </div>
          </form>
        )}
      </div>

      {/* PRODUCT LIST */}
      {products.map(product => (
        <div key={product.id} className={`bg-white rounded-xl shadow-md border-l-8 transition-opacity ${product.is_active ? 'border-green-500' : 'border-gray-300 opacity-75'}`}>
          
          {/* EDIT MODE */}
          {editingId === product.id ? (
            <div className="p-5 space-y-4 bg-creme rounded-r-xl">
              <h3 className="font-bold text-wood-dark mb-2">Edit Details / जानकारी बदलें</h3>
              <input type="text" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full p-2 border rounded" placeholder="Name" />
              <textarea value={editFormData.description} onChange={e => setEditFormData({...editFormData, description: e.target.value})} rows="2" className="w-full p-2 border rounded" placeholder="Description"></textarea>
              
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-xs font-bold text-wood-light uppercase">Price (₹)</label>
                  <input type="number" value={editFormData.price} onChange={e => setEditFormData({...editFormData, price: e.target.value})} className="w-full p-2 border rounded mt-1" />
                </div>
                <div className="w-1/2">
                  <label className="text-xs font-bold text-wood-light uppercase">Unit (मात्रा)</label>
                  <select value={editFormData.unit} onChange={e => setEditFormData({...editFormData, unit: e.target.value})} className="w-full p-2 border rounded mt-1 bg-white">
                    <option value="Liter">Liter</option>
                    <option value="Kg">Kg</option>
                    <option value="Pack">Pack</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditingId(null)} className="w-1/2 border-2 border-wood-dark text-wood-dark py-2 rounded font-bold text-sm">Cancel</button>
                <button 
                  onClick={() => updateProduct(product.id, { 
                    name: editFormData.name, 
                    description: editFormData.description, 
                    price: editFormData.price, 
                    unit: editFormData.unit 
                  })} 
                  className="w-1/2 bg-heritage-red text-white py-2 rounded font-bold text-sm"
                >
                  Update / सेव करें
                </button>
              </div>
            </div>
          ) : (
            
            /* NORMAL VIEW MODE */
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-wood-dark">{product.name}</h3>
                  <span className="text-xs text-wood-light uppercase block mt-1">₹{product.price} / {product.unit} • {product.category}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-bold rounded ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                  {product.is_active ? 'In Stock (उपलब्ध है)' : 'Out of Stock (खत्म)'}
                </span>
              </div>
              
              <p className="text-sm text-wood-light mb-4">{product.description}</p>

              <div className="flex gap-3 mt-3 pt-4 border-t border-[#e5dfd3]">
                <button 
                  onClick={() => startEditing(product)}
                  className="flex-1 bg-creme text-wood-dark py-2 rounded font-bold text-sm border border-[#e5dfd3] hover:bg-wood-dark hover:text-white transition-colors"
                >
                  Edit (बदलें)
                </button>
                <button 
                  onClick={() => updateProduct(product.id, { is_active: !product.is_active })}
                  className={`flex-1 py-2 rounded font-bold text-sm transition-colors border-2 ${product.is_active ? 'border-red-200 text-red-700 hover:bg-red-50' : 'border-green-200 text-green-700 hover:bg-green-50'}`}
                >
                  {product.is_active ? 'Remove Stock' : 'Add Stock'}
                </button>
              </div>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}