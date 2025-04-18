import { useState } from "react";
import { Product } from "../types/product";
import DeleteProductModal from "../modals/DeleteProductModal";
import Button from "./Button";
interface ProductCardProps {
  product: Product;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ProductCard({
  product,
  onView,
  onDelete,
  onEdit,
}: ProductCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirmed = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    await onDelete(product._id);
    setIsDeleting(false);
    setShowConfirm(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden relative items-center cursor-pointer hover:scale-105">
      <div onClick={() => onView(product._id)}>
        <img src={product.image} alt={product.name} className="" />
      </div>

      <div className="p-4">
        <h2
          className=" font-semibold text-gray-800 mb-1 text-sm"
          onClick={() => onView(product._id)}
        >
          {" "}
          {product.name.length > 20
            ? product.name.slice(0, 25) + "..."
            : product.name}
        </h2>
        <p
          className="text-xs text-gray-600 mb-3"
          onClick={() => onView(product._id)}
        >
          {product.description.length > 25
            ? product.description.slice(0, 35) + "..."
            : product.description}
        </p>

        <div
          className="flex justify-between items-center"
          onClick={() => onView(product._id)}
        >
          <span className="text-sm font-bold text-indigo-600">
            {product.currency} {product.price}
          </span>
        </div>
        <div className="mt-4 flex gap-3 bottom-0">
          <Button
            label="Edit"
            variant="primary"
            onClick={() => onEdit(product._id)}
          />

          <Button
            label="Delete"
            variant="danger"
            onClick={() => setShowConfirm(true)}
          />
        </div>
      </div>

      {showConfirm && (
        <DeleteProductModal
          productName={product.name}
          isDeleting={isDeleting}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
