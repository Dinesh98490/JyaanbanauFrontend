import { Eye, Edit2, Trash2, Users } from "lucide-react"

export default function ClassCard({ gymClass, onView, onEdit, onDelete }) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-500/50">
      {/* Trainer Photo Section */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
        {gymClass.image || gymClass.previewUrl ? (
          <img
            src={gymClass.image || gymClass.previewUrl || "/placeholder.svg"}
            alt={gymClass.trainerName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
            <Users className="w-16 h-16 text-white opacity-50" />
          </div>
        )}

        {/* Level Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${gymClass.level === "Beginner"
              ? "bg-green-500/90 text-white"
              : gymClass.level === "Intermediate"
                ? "bg-amber-500/90 text-white"
                : "bg-red-500/90 text-white"
              }`}
          >
            {gymClass.level}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {gymClass.className}
        </h3>
        <p className="text-gray-500 mb-4 font-medium">{gymClass.trainerName}</p>

        <p className="text-gray-500 mb-4 line-clamp-2">{gymClass.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{gymClass.totalMembers} members</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onView(gymClass)}
            className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors py-2"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </button>

          <button
            onClick={() => onEdit(gymClass)}
            className="flex-1 flex items-center justify-center border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors py-2"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </button>

          <button
            onClick={() => onDelete(gymClass._id || gymClass.id)}
            className="flex-1 flex items-center justify-center border border-red-200 hover:bg-red-50 rounded-lg transition-colors py-2"
          >
            <Trash2 className="w-4 h-4 text-red-600 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
