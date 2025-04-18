import { useRef, useState } from 'react';
import axios from 'axios';
import { API } from '../api/endpoints';
import { Product } from '../types/product';

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSuccess: (updatedProduct: Product) => void;
}

export default function EditProductModal({
  product,
  onClose,
  onSuccess,
}: EditProductModalProps) {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    currency: product.currency,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product.image);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('description', form.description);
      data.append('price', form.price);
      data.append('currency', form.currency);
      if (imageFile) {
        data.append('image', imageFile);
      }

      const res = await axios.put<Product>(
        API.UPDATE_PRODUCT_BY_ID(product._id),
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      onSuccess(res.data);
      onClose();
    } catch (err) {
      console.error('Failed to update product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800/50 backdrop-blur-xs bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Product</h2>

        <div className="grid gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white"
          >
            <option value="">Select currency</option>
            <option value="LKR">LKR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>

          {/* 🔁 Clickable Image Preview */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded border mt-2 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
