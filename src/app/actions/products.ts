"use server";

import { db } from "@/lib/db";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

// Product Type
export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  color: "cyan" | "blue" | "purple" | "green" | "orange" | "red";
  created_at: string;
}

// Ensure the directory exists
const UPLOADS_DIR = 'D:\\GboticsData\\uploads';

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  try {
    const stmt = db.prepare('SELECT * FROM products ORDER BY created_at DESC');
    return stmt.all() as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

// Get unique categories from products
export async function getCategories(): Promise<string[]> {
  try {
    const stmt = db.prepare('SELECT DISTINCT category FROM products ORDER BY category');
    const results = stmt.all() as { category: string }[];
    return results.map(r => r.category);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

// Delete a product by ID (admin only)
export async function deleteProduct(id: number) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return { success: false, error: "Unauthorized" };
    }

    const getStmt = db.prepare('SELECT image FROM products WHERE id = ?');
    const product = getStmt.get(id) as { image: string } | undefined;

    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    stmt.run(id);

    // If it's a locally uploaded file, attempt to delete it
    if (product && product.image.startsWith('/api/images/')) {
        const filename = product.image.split('/').pop();
        if (filename) {
            try {
                await fs.unlink(path.join(UPLOADS_DIR, filename));
            } catch (err) {
                console.warn("Could not delete image file", err);
            }
        }
    }

    revalidatePath('/products');
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete from database" };
  }
}

// Add a new product via FormData (admin only)
export async function addProduct(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return { success: false, error: "Unauthorized" };
    }

    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string) || 0;
    const color = formData.get('color') as string || 'cyan';
    const imageFile = formData.get('image') as File | null;

    if (!name || !category || !description) {
      return { success: false, error: "Missing required fields" };
    }

    if (price <= 0) {
      return { success: false, error: "Price must be greater than 0" };
    }

    let imageUrl = '';

    // If a file was uploaded, save it to the D drive
    if (imageFile && imageFile.size > 0) {
      // Ensure uploads directory exists
      try {
        await fs.access(UPLOADS_DIR);
      } catch {
        await fs.mkdir(UPLOADS_DIR, { recursive: true });
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${Date.now()}-${safeName}`;
      const filePath = path.join(UPLOADS_DIR, filename);

      await fs.writeFile(filePath, buffer);
      imageUrl = `/api/images/${filename}`;
    } else {
        return { success: false, error: "Image file is required" };
    }

    const stmt = db.prepare(`
      INSERT INTO products (name, category, image, description, price, color) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(name, category, imageUrl, description, price, color);
    
    revalidatePath('/products');
    revalidatePath('/admin');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Failed to add product:", error);
    return { success: false, error: "Failed to add product to database" };
  }
}

// Update an existing product (admin only)
export async function updateProduct(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return { success: false, error: "Unauthorized" };
    }

    const id = parseInt(formData.get('id') as string);
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string) || 0;
    const color = formData.get('color') as string || 'cyan';
    const imageFile = formData.get('image') as File | null;

    if (!id || !name || !category || !description) {
      return { success: false, error: "Missing required fields" };
    }

    if (price <= 0) {
      return { success: false, error: "Price must be greater than 0" };
    }

    // Check if new image was uploaded
    if (imageFile && imageFile.size > 0) {
      // Delete old image
      const oldProduct = db.prepare('SELECT image FROM products WHERE id = ?').get(id) as { image: string } | undefined;
      if (oldProduct && oldProduct.image.startsWith('/api/images/')) {
        const oldFilename = oldProduct.image.split('/').pop();
        if (oldFilename) {
          try {
            await fs.unlink(path.join(UPLOADS_DIR, oldFilename));
          } catch { /* ignore */ }
        }
      }

      // Save new image
      try {
        await fs.access(UPLOADS_DIR);
      } catch {
        await fs.mkdir(UPLOADS_DIR, { recursive: true });
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${Date.now()}-${safeName}`;
      const filePath = path.join(UPLOADS_DIR, filename);
      await fs.writeFile(filePath, buffer);
      const imageUrl = `/api/images/${filename}`;

      db.prepare(`
        UPDATE products SET name = ?, category = ?, image = ?, description = ?, price = ?, color = ?
        WHERE id = ?
      `).run(name, category, imageUrl, description, price, color, id);
    } else {
      // Update without changing image
      db.prepare(`
        UPDATE products SET name = ?, category = ?, description = ?, price = ?, color = ?
        WHERE id = ?
      `).run(name, category, description, price, color, id);
    }

    revalidatePath('/products');
    revalidatePath('/admin');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error: "Failed to update product" };
  }
}
