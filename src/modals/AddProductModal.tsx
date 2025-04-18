import { useState } from "react";
import axios from "axios";
import { API } from "../api/endpoints";
import { Product } from "../types/product";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface AddProductModalProps {
  onClose: () => void;
  onSuccess: (newProduct: Product) => void;
}

export default function AddProductModal({
  onClose,
  onSuccess,
}: AddProductModalProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    currency: "LKR",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Type guard for file input
    if (
      name === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("currency", form.currency);
    if (imageFile) formData.append("image", imageFile);

    try {
      setLoading(true);
      const res = await axios.post<Product>(API.ADD_PRODUCT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      onSuccess(res.data);
      onClose();
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800/50 backdrop-blur-xs bg-opacity-500 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add New Product
        </h2>

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
            type="number"
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

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded border mt-2"
            />
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
             
             <AiOutlineLoading3Quarters />
              
          
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
