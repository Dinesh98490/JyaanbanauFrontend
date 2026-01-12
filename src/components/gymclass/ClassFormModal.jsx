import React, { useState, useRef, useEffect } from "react";
import { X, Check, AlertCircle, ImageIcon } from "lucide-react";
import { IMAGE_PATHS } from "../../common/ImageConstant";
export default function ClassFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}) {
  const fileInputRef = useRef(null);
  const [formState, setFormState] = useState(
    initialData
      ? {
        className: initialData.className,
        description: initialData.description,
        trainerName: initialData.trainerName,
        totalMembers: initialData.totalMembers,
        level: initialData.level,
        trainerPhoto: null,
        previewUrl: initialData.image || initialData.previewUrl,
      }
      : {
        className: "",
        description: "",
        trainerName: "",
        totalMembers: 0,
        level: "",
        trainerPhoto: null,
        previewUrl: null,
      }
  );
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormState({
          className: initialData.className || initialData.name || "", // Handle both naming conventions just in case
          description: initialData.description || "",
          trainerName: initialData.trainerName || "",
          totalMembers: initialData.totalMembers || 0,
          level: initialData.level || "",
          trainerPhoto: null,
          previewUrl: initialData.image || initialData.previewUrl || null,
        });
      } else {
        // Reset for Add mode
        setFormState({
          className: "",
          description: "",
          trainerName: "",
          totalMembers: 0,
          level: "",
          trainerPhoto: null,
          previewUrl: null,
        });
      }
      setErrors({});
      setTouched({});
      // Clear file input if ref exists
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [isOpen, initialData]);

  const validateField = (name, value) => {
    switch (name) {
      case "className":
        if (!value || value.trim() === "") return "Class name is required";
        if (value.length < 2) return "Class name must be at least 2 characters";
        return;
      case "description":
        if (!value || value.trim() === "") return "Description is required";
        if (value.length < 10)
          return "Description must be at least 10 characters";
        return;
      case "trainerName":
        if (!value || value.trim() === "") return "Trainer name is required";
        return;
      case "level":
        if (!value || value.trim() === "") return "Level is required";
        return;
      default:
        return;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === "totalMembers" ? parseInt(value) || 0 : value;
    setFormState((prev) => ({ ...prev, [name]: finalValue }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, finalValue),
      }));
    }
  };

  const handleSelectChange = (value) => {
    setFormState((prev) => ({ ...prev, level: value }));
    if (touched.level) {
      setErrors((prev) => ({ ...prev, level: validateField("level", value) }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formState[name]),
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState((prev) => ({
        ...prev,
        trainerPhoto: file,
        previewUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFormState((prev) => ({ ...prev, trainerPhoto: null, previewUrl: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;
    ["className", "description", "trainerName", "level"].forEach((field) => {
      const error = validateField(field, formState[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formState);
  };

  const handleCancel = () => {
    setFormState({
      className: "",
      description: "",
      trainerName: "",
      totalMembers: 0,
      level: "",
      trainerPhoto: null,
      previewUrl: null,
    });
    setErrors({});
    setTouched({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl my-8">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold">
              {initialData ? "Edit Class" : "Add New Class"}
            </h2>
            <p className="text-gray-500 mt-2">
              {initialData
                ? "Update the class details below"
                : "Create a new fitness class and assign it to a trainer"}
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Class Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Class Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="className"
                value={formState.className}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full h-10 border rounded px-3 mt-1 ${touched.className && errors.className
                  ? "border-red-500 bg-red-50"
                  : touched.className && !errors.className
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                  }`}
                placeholder="e.g., Advanced Yoga"
              />
              {touched.className && (
                <p
                  className={`text-xs mt-1 ${errors.className ? "text-red-500" : "text-green-600"
                    }`}
                >
                  {errors.className || "Looks good!"}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formState.description}
                onChange={handleInputChange}
                onBlur={handleBlur}
                rows="4"
                className={`w-full border rounded px-3 py-2 mt-1 resize-none ${touched.description && errors.description
                  ? "border-red-500 bg-red-50"
                  : touched.description && !errors.description
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                  }`}
                placeholder="Describe the class..."
              />
              {touched.description && (
                <p
                  className={`text-xs mt-1 ${errors.description ? "text-red-500" : "text-green-600"
                    }`}
                >
                  {errors.description || "Looks good!"}
                </p>
              )}
            </div>

            {/* Trainer Name & Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Trainer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="trainerName"
                  value={formState.trainerName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full h-10 border rounded px-3 mt-1 ${touched.trainerName && errors.trainerName
                    ? "border-red-500 bg-red-50"
                    : touched.trainerName && !errors.trainerName
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                    }`}
                  placeholder="e.g., John Smith"
                />
                {touched.trainerName && (
                  <p
                    className={`text-xs mt-1 ${errors.trainerName ? "text-red-500" : "text-green-600"
                      }`}
                  >
                    {errors.trainerName || "Looks good!"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="level"
                  value={formState.level}
                  onChange={(e) => handleSelectChange(e.target.value)}
                  className={`w-full h-10 border rounded px-3 mt-1 ${touched.level && errors.level
                    ? "border-red-500 bg-red-50"
                    : touched.level && !errors.level
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                    }`}
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                {touched.level && (
                  <p
                    className={`text-xs mt-1 ${errors.level ? "text-red-500" : "text-green-600"
                      }`}
                  >
                    {errors.level || "Looks good!"}
                  </p>
                )}
              </div>
            </div>

            {/* Total Members */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Total Members (Capacity)
              </label>
              <input
                type="number"
                name="totalMembers"
                min="0"
                value={formState.totalMembers}
                onChange={handleInputChange}
                className="w-full h-10 border rounded px-3 mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum capacity for this class (optional)
              </p>
            </div>

            {/* Trainer Photo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Trainer Photo
              </label>
              {formState.previewUrl ? (
                <div className="space-y-2">
                  <div className="relative w-full h-48 border rounded overflow-hidden">
                    <img
                      src={formState.previewUrl}
                      alt="jyaanbanau"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="w-full border border-red-500 text-red-500 rounded py-2 hover:bg-red-50 transition"
                  >
                    Remove Photo
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                  <ImageIcon className="mx-auto w-6 h-6 text-gray-400 mb-2" />
                  <p className="text-gray-600 text-sm">
                    Click to upload or drag and drop
                  </p>
                </div>
              )}
            </div>

            {/* Submit / Cancel */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
              >
                {isSubmitting
                  ? "Submitting..."
                  : initialData
                    ? "Update Class"
                    : "Create Class"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="flex-1 border border-gray-300 rounded py-2 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
