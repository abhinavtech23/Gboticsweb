import Footer from "@/components/navigation/footer";
import { getProducts } from "@/app/actions/products";
import ProductGrid from "./product-grid";

export const metadata = {
  title: "Products | GBOTICS",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <div className="pt-32 pb-20 bg-transparent min-h-screen">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">Hardware.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-blue-600">Reimagined.</span></h1>
              <p className="text-white/60 text-lg">Browse our catalog of industry-defining robotics, AI processors, and automation software.</p>
            </div>
          </div>
          <ProductGrid initialProducts={products} />
        </div>
      </div>
      <Footer />
    </>
  );
}
