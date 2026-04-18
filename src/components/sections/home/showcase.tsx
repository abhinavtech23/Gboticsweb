import { GlowCard } from "@/components/ui/spotlight-card";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/app/actions/products";

export default async function ShowcaseSection() {
  const allProducts = await getProducts();
  const products = allProducts.slice(0, 3); // Show latest 3

  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4">Latest Products.</h2>
            <p className="text-white/60 max-w-md">Discover our newest additions to the GBOTICS product lineup.</p>
          </div>
          <Link
            href="/products"
            className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors w-fit flex items-center gap-2 group"
          >
            View All Products
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group relative rounded-2xl overflow-hidden bg-[#0d1117] border border-white/10 h-[500px]">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 blur-[2px] group-hover:blur-0 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-xs font-bold tracking-widest text-[#00f0ff] uppercase mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  {product.price > 0 && (
                    <p className="text-[#00f0ff] font-bold text-lg mb-2">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}
                    </p>
                  )}
                  <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#0d1117]/50 rounded-3xl border border-white/5">
            <Sparkles size={48} className="mx-auto text-[#00f0ff]/30 mb-6" />
            <h3 className="text-2xl font-bold text-white/30 mb-3">Products Coming Soon</h3>
            <p className="text-white/20 max-w-md mx-auto">
              We&apos;re working on some exciting products. Stay tuned for launches!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
