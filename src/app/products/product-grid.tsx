"use client";

import { useState, useMemo } from "react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { ArrowUpRight, Filter, Package } from "lucide-react";
import { Product, incrementProductView } from "@/app/actions/products";

export default function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Dynamic categories from actual products
  const categories = useMemo(() => {
    const cats = [...new Set(initialProducts.map(p => p.category))];
    return ["All", ...cats];
  }, [initialProducts]);

  const filteredProducts = activeCategory === "All"
    ? initialProducts
    : initialProducts.filter(p => p.category === activeCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Category Filters */}
      {categories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar mb-16">
          <div className="flex items-center mr-4 text-white/40">
            <Filter size={16} className="mr-2" />
            <span className="text-sm font-medium uppercase tracking-wider">Filter</span>
          </div>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === category
                  ? "bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <GlowCard
            key={product.id}
            glowColor={product.color || "cyan"}
            customSize={true}
            className="h-[480px] p-0 overflow-hidden group border border-white/5"
          >
            <div className="absolute inset-x-0 bottom-0 top-0 z-0 bg-black/50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-1/2 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-[#0d1117]/80 to-[#0d1117]"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full justify-end p-8 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/90 to-transparent">
              <div className="inline-block px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold tracking-widest text-white/70 uppercase mb-4 w-fit">
                {product.category}
              </div>
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              {product.price > 0 && (
                <p className="text-[#00f0ff] font-bold text-lg mb-3">
                  {formatPrice(product.price)}
                </p>
              )}
              <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>
              <button 
                onClick={async () => {
                  await incrementProductView(product.id);
                  alert(`Registration for intent to view '${product.name}' recorded! Details coming soon.`);
                }}
                className="flex items-center gap-2 text-sm font-medium text-[#00f0ff] group-hover:text-white transition-colors w-fit mt-auto"
              >
                View Details
                <ArrowUpRight size={16} />
              </button>
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="col-span-full py-24 text-center">
          <Package size={56} className="mx-auto text-white/10 mb-6" />
          <h3 className="text-xl font-bold text-white/30 mb-2">
            {activeCategory !== "All" ? "No products in this category" : "Coming Soon"}
          </h3>
          <p className="text-white/20 text-sm max-w-md mx-auto">
            {activeCategory !== "All"
              ? "Try selecting a different category or check back later."
              : "We are preparing our product catalog. Stay tuned for some exciting launches!"}
          </p>
        </div>
      )}
    </>
  );
}
