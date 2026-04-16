"use client";

import { useState } from "react";
import { Product, addProduct, deleteProduct } from "@/app/actions/products";
import { Trash2, Plus, Upload, ShieldCheck, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard({ initialProducts }: { initialProducts: Product[] }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  // Handle fake auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "gboticsadmin") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Incorrect admin password.");
    }
  };

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-transparent flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-[#0a0a0f] p-8 rounded-2xl border border-white/10 max-w-sm w-full relative z-10 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
          <div className="flex justify-center mb-6 text-[#00f0ff]">
            <Lock size={48} />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Admin Access</h2>
          {errorMsg && <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>}
          <div className="mb-6">
            <label className="block text-white/60 text-sm mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password..."
            />
          </div>
          <button type="submit" className="w-full bg-[#00f0ff] text-black font-bold py-3 rounded-lg hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-transparent min-h-screen relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <ShieldCheck className="text-[#00f0ff]" size={36} />
          <h1 className="text-4xl font-bold tracking-tighter">GBOTICS Admin Panel</h1>
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
                
                <div>
                  <label className="block text-white/60 text-sm mb-2">Category</label>
                  <select required name="category" className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00f0ff]">
                    <option value="Robotics">Robotics</option>
                    <option value="AI">AI</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white/60 text-sm mb-2">Glow Color</label>
                  <select required name="color" className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00f0ff]">
                    <option value="cyan">Cyan</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
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
              <h2 className="text-xl font-bold mb-6">Current Products ({initialProducts.length})</h2>
              
              <div className="flex flex-col gap-4">
                {initialProducts.length === 0 ? (
                  <p className="text-white/40 italic">No products found. Add one to get started.</p>
                ) : (
                  initialProducts.map(product => (
                    <div key={product.id} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:border-white/20 transition-colors">
                      <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg bg-black" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{product.name}</h3>
                          <span className="text-xs px-2 py-1 bg-white/10 rounded-md text-[#00f0ff] uppercase tracking-wider">{product.category}</span>
                        </div>
                        <p className="text-sm text-white/50 line-clamp-1">{product.description}</p>
                      </div>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all ml-4 shrink-0"
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
