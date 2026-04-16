"use server";

import { db } from "@/lib/db";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

// Product Type
export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
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

// Delete a product by ID
export async function deleteProduct(id: number) {
  try {
    const getStmt = db.prepare('SELECT image FROM products WHERE id = ?');
    const product = getStmt.get(id) as { image: string } | undefined;

    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    stmt.run(id);

    // If it's a locally uploaded file stored in D drive, attempt to delete it
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
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete from database" };
  }
}

// Add a new product via FormData
export async function addProduct(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const color = formData.get('color') as string || 'blue';
    const imageFile = formData.get('image') as File | null;

    if (!name || !category || !description) {
      return { success: false, error: "Missing required fields" };
    }

    let imageUrl = '';

    // If a file was uploaded, save it to the D drive
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      // Generate a safe unique filename
      const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${Date.now()}-${safeName}`;
      const filePath = path.join(UPLOADS_DIR, filename);

      await fs.writeFile(filePath, buffer);
      
      // The image URL will point to our custom API route
      imageUrl = `/api/images/${filename}`;
    } else {
        return { success: false, error: "Image file is required" };
    }

    const stmt = db.prepare(`
      INSERT INTO products (name, category, image, description, color) 
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(name, category, imageUrl, description, color);
    
    // Revalidate paths so the UI updates
    revalidatePath('/products');
    revalidatePath('/admin');
    
    return { success: true };
  } catch (error) {
    console.error("Failed to add product:", error);
    return { success: false, error: "Failed to add product to database" };
  }
}
