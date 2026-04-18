import { getProducts } from "@/app/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./admin-dashboard";

export const metadata = {
  title: "Admin Dashboard | GBOTICS",
};

export default async function AdminPage() {
  const user = await getCurrentUser();
  
  // Double-check: must be logged in and be admin
  if (!user || user.role !== 'admin') {
    redirect('/login?redirect=/admin');
  }

  const products = await getProducts();
  
  return <AdminDashboard initialProducts={products} adminName={user.name} />;
}
