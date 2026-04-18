"use client";

import { useState } from "react";
import { Product, addProduct, deleteProduct } from "@/app/actions/products";
import { Trash2, Plus, Upload, ShieldCheck, Tag, Eye, BarChart3, Package } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdminDashboardProps {
  initialProducts: Product[];
  adminName: string;
}

export default function AdminDashboard({ initialProducts, adminName }: AdminDashboardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  // Summary calculations
  const totalProducts = initialProducts.length;
  const totalViews = initialProducts.reduce((sum, p) => sum + (p.views || 0), 0);
  
  const mostViewedProduct = initialProducts.length > 0 
    ? initialProducts.reduce((prev, current) => ((current.views || 0) > (prev.views || 0) ? current : prev))
    : null;

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await deleteProduct(id);
    router.refresh();
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await addProduct(formData);
      if (result.success) {
        // Reset form completely
        (e.target as HTMLFormElement).reset();
        router.refresh();
      } else {
        setErrorMsg(result.error || "Failed to add product");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-transparent min-h-screen relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[#00f0ff]" size={36} />
            <div>
              <h1 className="text-4xl font-bold tracking-tighter">Admin Dashboard</h1>
              <p className="text-white/60">Welcome back, <span className="text-[#00f0ff] font-medium">{adminName}</span></p>
            </div>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white/60 font-medium">Total Products</h3>
              <Package className="text-[#00f0ff]" size={20} />
            </div>
            <p className="text-4xl font-bold">{totalProducts}</p>
          </div>
          
          <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white/60 font-medium">Total Page/Product Views</h3>
              <Eye className="text-green-400" size={20} />
            </div>
            <p className="text-4xl font-bold">{totalViews}</p>
          </div>

          <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white/60 font-medium">Most Viewed Product</h3>
              <BarChart3 className="text-purple-400" size={20} />
            </div>
            <p className="text-2xl font-bold leading-tight line-clamp-1">
              {mostViewedProduct ? mostViewedProduct.name : "None yet"}
            </p>
            <p className="text-sm text-white/50 mt-1">
              {mostViewedProduct ? `${mostViewedProduct.views || 0} relative views` : "Add a product to track"}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 sticky top-32 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus size={20} className="text-[#00f0ff]" />
                Add New Product
              </h2>
              {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}

              <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Product Name</label>
                  <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00f0ff]" placeholder="e.g. Nexus AI" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Category</label>
                    <select required name="category" className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00f0ff]">
                      <option value="Robotics">Robotics</option>
                      <option value="AI">AI</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Price (INR)</label>
                    <input required name="price" type="number" min="1" step="1" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00f0ff]" placeholder="0" />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Glow Color</label>
                  <select required name="color" className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00f0ff]">
                    <option value="cyan">Cyan</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="green">Green</option>
                    <option value="orange">Orange</option>
                    <option value="red">Red</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Description</label>
                  <textarea required name="description" rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00f0ff]" placeholder="Brief description of the product..."></textarea>
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Product Image</label>
                  <div className="relative border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#00f0ff]/50 transition-colors bg-white/5 cursor-pointer">
                    <input required name="image" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <Upload className="mx-auto text-white/40 mb-2" size={24} />
                    <p className="text-sm text-white/60">Click to upload image</p>
                  </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full bg-[#00f0ff] text-black font-bold py-3 mt-4 rounded-lg hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? "Uploading..." : "Publish Product"}
                </button>
              </form>
            </div>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <h2 className="text-xl font-bold mb-6">Current Products Inventory</h2>

              <div className="flex flex-col gap-4">
                {initialProducts.length === 0 ? (
                  <p className="text-white/40 italic flex flex-col items-center justify-center py-12 gap-4">
                    <Tag size={48} className="opacity-20" />
                    No products found. Add one to get started.
                  </p>
                ) : (
                  initialProducts.map(product => (
                    <div key={product.id} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:border-white/20 transition-colors">
                      <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg bg-black shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-lg truncate max-w-[200px]">{product.name}</h3>
                          <span className="text-xs px-2 py-1 bg-white/10 rounded-md text-[#00f0ff] uppercase tracking-wider shrink-0">{product.category}</span>
                          <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-md shrink-0 border border-green-500/20">
                            ₹{product.price?.toLocaleString('en-IN') || 0}
                          </span>
                        </div>
                        <p className="text-sm text-white/50 line-clamp-1">{product.description}</p>
                      </div>
                      
                      {/* View Analytics Badge */}
                      <div className="flex flex-col items-center justify-center px-4 shrink-0 border-l border-white/10">
                        <Eye size={18} className="text-white/40 mb-1" />
                        <span className="font-mono font-bold">{product.views || 0}</span>
                        <span className="text-[10px] text-white/40 uppercase">views</span>
                      </div>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all ml-2 shrink-0"
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
