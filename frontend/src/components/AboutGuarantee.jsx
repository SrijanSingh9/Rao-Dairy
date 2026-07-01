export default function AboutGuarantee() {
  return (
    // The id="guarantee" allows the Hero button to scroll right to this section
    <section id="guarantee" className="py-20 px-6 md:px-16 bg-creme-light border-y border-[#e5dfd3]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: About Us */}
        <div>
          <h2 className="text-sm font-bold text-heritage-red uppercase tracking-widest mb-2">Our Heritage</h2>
          <h3 className="text-4xl font-bold text-wood-dark mb-6">Rooted in Roorkee since 2002.</h3>
          <p className="text-lg text-wood-light mb-4 leading-relaxed">
            For over two decades, Rao Dairy has been a small offline business with a massive commitment to quality. We don't believe in mass-factory production; we believe in traditional dairy farming where the health of our cattle dictates the quality of your milk.
          </p>
          <p className="text-lg text-wood-light leading-relaxed">
            From farm to table, we maintain the strictest hygiene protocols so you can serve your family with absolute confidence.
          </p>
        </div>

        {/* Right Side: The Lactometer Guarantee */}
        <div className="bg-creme border-2 border-heritage-red/20 p-8 rounded-xl shadow-sm relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-heritage-red/5 rounded-full blur-2xl"></div>
          
          <h3 className="text-2xl font-bold text-wood-dark mb-4 relative z-10">The Live Lactometer Test</h3>
          <p className="text-wood-dark mb-6 relative z-10 font-medium italic">
            "Don't just take our word for it. Test the milk with a lactometer and see the results live."
          </p>
          <ul className="space-y-3 relative z-10">
            <li className="flex items-start gap-3">
              <span className="text-heritage-red font-bold">✓</span>
              <span className="text-wood-light">100% Unadulterated</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-heritage-red font-bold">✓</span>
              <span className="text-wood-light">No Artificial Thickening Agents</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-heritage-red font-bold">✓</span>
              <span className="text-wood-light">Transparent Quality Checking</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}