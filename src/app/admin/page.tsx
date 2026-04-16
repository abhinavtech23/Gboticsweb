import { getProducts } from "@/app/actions/products";
import AdminDashboard from "./admin-dashboard";
import Footer from "@/components/navigation/footer";

export const metadata = {
  title: "Admin Panel | GBOTICS",
};

export default async function AdminPage() {
  const products = await getProducts();
  
  return (
    <>
      <AdminDashboard initialProducts={products} />
      <Footer />
    </>
  );
}
