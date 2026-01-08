import { useState } from "react";

import ClassFormModal from "./ClassFormModal.jsx";
import ClassesGrid from "./ClassesGrid.jsx";
import ViewClassModal from "./ViewClassModal.jsx";
import { IMAGE_PATHS } from "../../common/ImageConstant.js";

const INITIAL_CLASSES = [
    {
      id: "1",
      className: "Advanced Yoga",
      description:
        "A challenging yoga class that focuses on advanced poses, breathing techniques, and meditation.",
      trainerName: "Sarah Johnson",
      totalMembers: 18,
      level: "Advanced",
      previewUrl: IMAGE_PATHS.landingimage, 
      trainerPhoto: null,
    },
    {
      id: "2",
      className: "HIIT Training",
      description:
        "High-Intensity Interval Training designed to boost cardio fitness.",
      trainerName: "Mike Chen",
      totalMembers: 24,
      level: "Intermediate",
      previewUrl: IMAGE_PATHS.yoga, 
      trainerPhoto: null,
    },
  ];
  
export default function GymClassForm() {
  const [createdClasses, setCreatedClasses] = useState(INITIAL_CLASSES);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editingClassId, setEditingClassId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (formState) => {
    setIsSubmitting(true);

    setTimeout(() => {
      if (editingClassId) {
        setCreatedClasses((prev) =>
          prev.map((c) =>
            c.id === editingClassId ? { ...c, ...formState } : c
          )
        );
        setEditingClassId(null);
      } else {
        setCreatedClasses((prev) => [
          { id: Date.now().toString(), ...formState, trainerPhoto: null },
          ...prev,
        ]);
      }

      setIsSubmitting(false);
      setIsFormModalOpen(false);
    }, 1000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gym Classes Management</h1>
        <button
          type="button"
          onClick={() => setIsFormModalOpen(true)}
          className="h-11 px-6 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          + Add New Class
        </button>
      </div>

      {/* Classes Grid */}
      <ClassesGrid
        classes={createdClasses}
        onView={(c) => {
          setSelectedClass(c);
          setIsViewModalOpen(true);
        }}
        onEdit={(c) => {
          setSelectedClass(c);
          setEditingClassId(c.id);
          setIsFormModalOpen(true);
        }}
        onDelete={(id) =>
          confirm("Delete this class?") &&
          setCreatedClasses((prev) => prev.filter((c) => c.id !== id))
        }
      />

      {/* Modals */}
      <ClassFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingClassId ? selectedClass : null}
        isSubmitting={isSubmitting}
      />

      <ViewClassModal
        isOpen={isViewModalOpen}
        selectedClass={selectedClass}
        onClose={() => setIsViewModalOpen(false)}
      />
    </div>
  );
}
