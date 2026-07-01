import { useState, useEffect } from 'react';
import InventoryManager from './InventoryManager';

export default function OwnerDashboard() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('route');

  const fetchOrders = () => {
    setIsLoading(true);
    // Fetch all if history, ledger, or route is selected (simplified)
    const url = (activeTab === 'history' || activeTab === 'ledger') 
      ? 'http://127.0.0.1:8000/api/orders/?all=true' 
      : 'http://127.0.0.1:8000/api/orders/';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const markAsCompleted = async (orderId) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/orders/${orderId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Completed' })
      });
      fetchOrders();
    } catch (error) { alert("Error updating / अपडेट करने में त्रुटि"); }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed': return <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Delivered (पूरा हुआ)</span>;
      case 'Cancelled': return <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">Cancelled (रद्द)</span>;
      default: return <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Pending (बाकी है)</span>;
    }
  };

  return (
    <div className="min-h-screen bg-creme pb-20">
      {/* Dashboard Header */}
      <div className="bg-heritage-red text-creme-light p-4 shadow-md sticky top-0 z-10">
        <h1 className="text-xl font-bold">Rao Dairy Owner Panel</h1>
        
        {/* Toggle Tabs */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button onClick={() => setActiveTab('route')} className={`py-2 rounded font-bold text-xs ${activeTab === 'route' ? 'bg-white text-heritage-red' : 'bg-heritage-red-hover text-white'}`}>Route<br/>आज की डिलीवरी</button>
          <button onClick={() => setActiveTab('history')} className={`py-2 rounded font-bold text-xs ${activeTab === 'history' ? 'bg-white text-heritage-red' : 'bg-heritage-red-hover text-white'}`}>All Orders<br/>सभी ऑर्डर</button>
          <button onClick={() => setActiveTab('inventory')} className={`py-2 rounded font-bold text-xs ${activeTab === 'inventory' ? 'bg-white text-heritage-red' : 'bg-heritage-red-hover text-white'}`}>Products<br/>सामान</button>
          <button onClick={() => setActiveTab('ledger')} className={`py-2 rounded font-bold text-xs ${activeTab === 'ledger' ? 'bg-white text-heritage-red' : 'bg-heritage-red-hover text-white'}`}>Ledger<br/>हिसाब-किताब</button>
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="p-4 max-w-3xl mx-auto mt-4">
        {isLoading ? (
          <div className="text-center py-10">Loading... / लोड हो रहा है...</div>
        ) : activeTab === 'inventory' ? (
          <InventoryManager />
        ) : activeTab === 'ledger' ? (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow border border-green-200">
              <h2 className="font-bold text-green-700">Total Revenue (कुल कमाई)</h2>
              <p className="text-3xl font-black mt-1">₹{orders.filter(o => o.status === 'Completed').reduce((sum, o) => sum + parseFloat(o.total_amount), 0)}</p>
            </div>
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-creme uppercase font-bold text-[10px]"><tr><th className="p-3">Customer</th><th className="p-3 text-right">Total</th></tr></thead>
                <tbody>{orders.map(o => (<tr key={o.id} className="border-t"><td className="p-3">{o.customer_name}</td><td className="p-3 text-right font-bold">₹{o.total_amount}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.filter(o => activeTab === 'route' ? o.status === 'Pending' : true).map(order => (
              <div key={order.id} className={`bg-white rounded-xl shadow-md border-l-8 p-5 ${order.status === 'Completed' ? 'border-green-500' : 'border-heritage-red'}`}>
                <div className="flex justify-between items-start mb-4 border-b pb-3">
                  <div>
                    <h2 className="font-bold text-wood-dark text-lg">{order.customer_name}</h2>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.delivery_address)}`} target="_blank" className="text-[10px] text-blue-600 underline font-bold mt-1 block">Open in Maps</a>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-heritage-red">₹{order.total_amount}</span>
                    <div className="mt-1">{getStatusBadge(order.status)}</div>
                  </div>
                </div>
                <div className="bg-creme p-3 rounded-lg mb-4">
                  <p className="text-[10px] font-bold text-wood-light uppercase mb-2">Checklist</p>
                  {order.items.map((item, idx) => (<div key={idx} className="flex justify-between text-sm py-1 border-b border-[#e5dfd3]/50 font-medium">{item.quantity}x {item.product_name}</div>))}
                </div>
                <a href={`tel:${order.customer_phone}`} className="w-full block text-center bg-wood-dark text-white py-3 rounded-lg font-bold mb-2">Call {order.customer_phone}</a>
                {order.status === 'Pending' && (
                  <button onClick={() => markAsCompleted(order.id)} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">Delivered / दे दिया गया</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}