import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { API } from "../api/endpoints";
import { Product } from "../types/product";
import ProductModal from "../modals/ProductModal";
import AddProductModal from "../modals/AddProductModal";
import EditProductModal from "../modals/EditProductModal";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  const handleEdit = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (product) setEditProduct(product);
  };

  useEffect(() => {
    axios
      .get<Product[]>(API.GET_PRODUCTS)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleView = (productId: string) => {
    axios
      .get<Product>(API.GET_PRODUCT_BY_ID(productId))
      .then((res) => setSelectedProduct(res.data))
      .catch((err) => console.error("Error loading product:", err));
  };

  const handleDelete = (id: string) => {
    axios
      .delete(API.DELETE_PRODUCT_BY_ID(id))
      .then(() => setProducts(products.filter((p) => p._id !== id)))
      .catch((err) => console.error("Delete failed:", err));
  };
  const fetchProducts = () => {
    axios
      .get<Product[]>(API.GET_PRODUCTS, { params: { search } })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-700">
        Product Listing
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchProducts()}
          className="border border-gray-300 p-2 rounded-md w-full sm:w-96 shadow-sm"
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition shadow cursor-pointer"
        >
          + Add New Product
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-3xl mt-10">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onView={handleView}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSuccess={(newProduct) => setProducts([newProduct, ...products])}
        />
      )}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSuccess={(updated) => {
            setProducts(
              products.map((p) => (p._id === updated._id ? updated : p))
            );
            setEditProduct(null);
          }}
        />
      )}
    </div>
  );
}
