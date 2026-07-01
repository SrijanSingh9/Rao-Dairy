export default function Navbar({ toggleCart, totalItemsCount }) {
  return (
    <nav className="sticky top-0 z-40 bg-creme border-b border-[#e5dfd3] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex justify-between items-center">
        
        {/* Brand Name */}
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-heritage-red font-serif tracking-tight">
            Rao Dairy
          </h1>
          <span className="hidden md:inline-block text-xs font-medium text-wood-light uppercase tracking-widest mt-2 border-l border-wood-light/30 pl-2">
            Est. 2002
          </span>
        </div>

        {/* Cart Button */}
        <button 
          onClick={toggleCart}
          className="flex items-center gap-2 text-wood-dark hover:text-heritage-red transition-colors font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Cart
          {totalItemsCount > 0 && (
            <span className="bg-heritage-red text-creme-light px-2 py-0.5 rounded-full text-xs ml-1">
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}