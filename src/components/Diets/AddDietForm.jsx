import { useState, useEffect } from "react"
import { Upload, X, Plus } from "lucide-react"

export default function AddDietForm({ onAddDiet, editingDiet, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    protein: "",
    calories: "",
    description: "",
    imageUrl: "",
    imageFile: null,
  })
  const [imagePreview, setImagePreview] = useState("")
  const [imageInputType, setImageInputType] = useState("file")

  useEffect(() => {
    if (editingDiet) {
      setFormData({
        name: editingDiet.name,
        protein: editingDiet.protein,
        calories: editingDiet.calories.toString(),
        description: editingDiet.description,
        imageUrl: editingDiet.imageUrl || "",
      })
      setImagePreview(editingDiet.imageUrl || "")
    }
  }, [editingDiet])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Store file object for submission
    setFormData((prev) => ({ ...prev, imageFile: file }))

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleImageUrlChange = (e) => {
    const url = e.target.value
    setImagePreview(url)
    setFormData((prev) => ({ ...prev, imageUrl: url, imageFile: null }))
  }

  const clearImage = () => {
    setImagePreview("")
    setFormData((prev) => ({ ...prev, imageUrl: "", imageFile: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.protein || !formData.calories || !formData.description) {
      alert("Please fill in all fields")
      return
    }

    const dataToSubmit = {
      name: formData.name,
      protein: formData.protein,
      calories: parseInt(formData.calories),
      description: formData.description,
      imageUrl: formData.imageUrl,
      imageFile: formData.imageFile, // Pass the file
    }

    // For edit mode, we preserve ID
    if (editingDiet) {
      dataToSubmit.id = editingDiet.id || editingDiet._id;
    }

    onAddDiet(dataToSubmit)

    // Reset form
    setFormData({ name: "", protein: "", calories: "", description: "", imageUrl: "", imageFile: null })
    setImagePreview("")
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
      <h2 className="text-xl font-bold mb-2">
        {editingDiet ? "Edit Diet Plan" : "Create Your Own Diet Plan"}
      </h2>
      <p className="text-gray-500 mb-4">
        {editingDiet ? "Update your diet plan details" : "Add a custom diet plan to your collection"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Protein */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Plan Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter diet name"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Protein Level</label>
            <input
              type="text"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="e.g., High, Medium, Low"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Daily Calories</label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter calories"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Image Source</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setImageInputType("file")}
                className={`flex-1 px-3 py-2 rounded-md border ${imageInputType === "file"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600"
                  }`}
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setImageInputType("url")}
                className={`flex-1 px-3 py-2 rounded-md border ${imageInputType === "url"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600"
                  }`}
              >
                URL
              </button>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        {imageInputType === "file" ? (
          <div>
            <label className="block font-medium mb-1">Upload Image</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border px-2 py-1 rounded-md"
              />
              <Upload className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ) : (
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter image URL"
            />
          </div>
        )}

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Describe the diet plan"
          />
        </div>

        {/* Submit / Cancel Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {editingDiet ? "Update Diet Plan" : "Add Diet Plan"}
          </button>

          {editingDiet && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
