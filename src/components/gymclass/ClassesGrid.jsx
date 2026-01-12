import ClassCard from "./ClassCard"

export default function ClassesGrid({ classes, onView, onEdit, onDelete }) {
  if (!classes || classes.length === 0) {
    return (
      <div className="border-2 border-dashed rounded-lg">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 text-lg">
            No classes created yet
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Click "Add New Class" to create your first class
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Gym Classes
        </h2>
        <p className="text-gray-500">
          Manage and organize all your fitness classes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((gymClass) => (
          <ClassCard
            key={gymClass.id || gymClass._id}
            gymClass={gymClass}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}
