import { X } from "lucide-react";
import { IMAGE_PATHS } from "../../common/ImageConstant";

export default function ViewClassModal({ isOpen, selectedClass, onClose }) {
  if (!isOpen || !selectedClass) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-gray-300">
          <div>
            <h2 className="text-2xl font-bold">{selectedClass.className}</h2>
            <p className="text-gray-500">Full class details</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {selectedClass.previewUrl && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-300">
              <img
                src={IMAGE_PATHS.backgroundremovelogo}
                alt="login image"
                className="w-full max-w-lg object-left object-contain -translate-x-5"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Trainer Name
              </p>
              <p className="text-lg font-medium mt-1">
                {selectedClass.trainerName}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Level
              </p>
              <p className="text-lg font-medium mt-1">{selectedClass.level}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Capacity
              </p>
              <p className="text-lg font-medium mt-1">
                {selectedClass.totalMembers} Members
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Description
            </p>
            <p className="text-gray-700 leading-relaxed">
              {selectedClass.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
