
interface DeleteProductModalProps {
  productName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteProductModal({
  productName,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteProductModalProps) {
  return (
    <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
        <p className="mb-4 text-center text-gray-800 font-medium">
          Are you sure you want to delete <strong>{productName}</strong>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center min-w-[80px] cursor-pointer"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M4 12a8 8 0 018-8"
                  className="opacity-75"
                />
              </svg>
            ) : (
              'Yes'
            )}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer"
            disabled={isDeleting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
