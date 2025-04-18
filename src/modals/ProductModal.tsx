import { FaWindowClose } from "react-icons/fa";
import { Product } from "../types/product";


interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/50 backdrop-blur-xs bg-opacity-50 z-50 flex items-center justify-center shadow-2xl">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold scale-125 cursor-pointer"
        >
          <FaWindowClose color="red" />
        </button>
        <img src={product.image} alt={product.name} className="w-full object-cover rounded mb-4" />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-indigo-600">
          {product.currency} {product.price}
        </p>
      </div>
    </div>
  );
}
