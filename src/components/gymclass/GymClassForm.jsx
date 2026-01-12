import { useState, useEffect } from "react";
import ClassFormModal from "./ClassFormModal.jsx";
import ClassesGrid from "./ClassesGrid.jsx";
import ViewClassModal from "./ViewClassModal.jsx";
import api from "../../api/api.js";

export default function GymClassForm() {
  const [createdClasses, setCreatedClasses] = useState([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editingClassId, setEditingClassId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");
      // Backend returns { success: true, classes: [...] }
      setCreatedClasses(response.data.classes || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleFormSubmit = async (formState) => {
    setIsSubmitting(true);

    // Transform data for backend
    const payload = {
      name: formState.className, // Backend expects 'name'
      description: formState.description,
      trainerName: formState.trainerName,
      totalMembers: formState.totalMembers,
      level: formState.level,
      image: formState.previewUrl // Send base64 as 'image'
    };

    try {
      if (editingClassId) {
        // Update
        const response = await api.put(`/classes/${editingClassId}`, payload);
        const updatedClass = response.data.gymClass;
        setCreatedClasses((prev) =>
          prev.map((c) =>
            (c.id === editingClassId || c._id === editingClassId) ? updatedClass : c
          )
        );
        setEditingClassId(null);
      } else {
        // Create
        const response = await api.post("/classes", payload);
        const newClass = response.data.gymClass;
        setCreatedClasses((prev) => [newClass, ...prev]);
      }
      setIsFormModalOpen(false);
    } catch (error) {
      console.error("Error saving class:", error);
      alert("Failed to save class");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this class?")) {
      try {
        await api.delete(`/classes/${id}`);
        setCreatedClasses((prev) => prev.filter((c) => (c.id !== id && c._id !== id)));
      } catch (error) {
        console.error("Error deleting class:", error);
        alert("Failed to delete class");
      }
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gym Classes Management</h1>
        <button
          type="button"
          onClick={() => {
            setEditingClassId(null);
            setSelectedClass(null);
            setIsFormModalOpen(true);
          }}
          className="h-11 px-6 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          + Add New Class
        </button>
      </div>

      {/* Classes Grid */}
      {loading ? (
        <div className="text-center py-10">Loading classes...</div>
      ) : (
        <ClassesGrid
          classes={createdClasses}
          onView={(c) => {
            setSelectedClass(c);
            setIsViewModalOpen(true);
          }}
          onEdit={(c) => {
            setSelectedClass(c);
            setEditingClassId(c.id || c._id);
            setIsFormModalOpen(true);
          }}
          onDelete={(id) => handleDelete(id)}
        />
      )}

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
