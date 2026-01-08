import { AlertCircle } from "lucide-react"

export default function DeleteConfirmationModal({ isOpen, trainer, onConfirm, onCancel }) {
  if (!isOpen || !trainer) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm bg-white rounded shadow-lg p-6 space-y-4">
        <div className="flex gap-4">
          <div className="rounded-lg bg-red-100 p-3 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>

          <div>
            <h2 className="text-lg font-bold">Delete Trainer?</h2>
            <p className="mt-1 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <strong>{trainer.fullName}</strong>? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
