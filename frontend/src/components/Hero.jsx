export default function Hero() {
  return (
    <section className="bg-creme text-wood-dark min-h-[80vh] flex items-center px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-heritage-red font-semibold tracking-widest uppercase text-sm mb-4 block">
          Established 2002 • Roorkee, Uttarakhand
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Pure Tradition, <br />
          <span className="text-heritage-red">Delivered Fresh.</span>
        </h1>
        <p className="text-lg md:text-xl text-wood-light mb-10 max-w-2xl mx-auto">
          Experience the authentic taste of 100% natural, farm-fresh buffalo and cow milk. Tested pure, right before your eyes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#products" 
            className="inline-block bg-heritage-red text-creme-light px-8 py-4 rounded-md font-medium hover:bg-heritage-red-hover transition-colors shadow-lg text-center"
          >
            Place an Order
          </a>
          <a 
            href="#guarantee" 
            className="inline-block border-2 border-wood-dark text-wood-dark px-8 py-4 rounded-md font-medium hover:bg-wood-dark hover:text-creme transition-colors text-center"
          >
            Our Lactometer Guarantee
          </a>
        </div>
      </div>
    </section>
  );
}