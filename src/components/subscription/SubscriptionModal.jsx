import { useState, useEffect } from "react"
import { X, Plus, Trash2 } from "lucide-react"

export default function SubscriptionModal({ isOpen, onClose, onSubmit, editingSubscription }) {
    const [formData, setFormData] = useState({
        subscriptionName: "",
        price: "",
        features: [""],
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (isOpen) {
            if (editingSubscription) {
                // Populate form for editing
                setFormData({
                    subscriptionName: editingSubscription.subscriptionName || "",
                    price: editingSubscription.price || "",
                    features: editingSubscription.features?.length > 0 ? editingSubscription.features : [""],
                })
            } else {
                // Reset for new subscription
                setFormData({
                    subscriptionName: "",
                    price: "",
                    features: [""],
                })
            }
            setErrors({})
        }
    }, [isOpen, editingSubscription])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features]
        newFeatures[index] = value
        setFormData((prev) => ({ ...prev, features: newFeatures }))
    }

    const addFeature = () => {
        setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }))
    }

    const removeFeature = (index) => {
        if (formData.features.length > 1) {
            const newFeatures = formData.features.filter((_, i) => i !== index)
            setFormData((prev) => ({ ...prev, features: newFeatures }))
        }
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.subscriptionName.trim()) {
            newErrors.subscriptionName = "Subscription name is required"
        }
        if (!formData.price || formData.price <= 0) {
            newErrors.price = "Price must be greater than 0"
        }
        const validFeatures = formData.features.filter((f) => f.trim())
        if (validFeatures.length === 0) {
            newErrors.features = "At least one feature is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return

        // Filter out empty features
        const validFeatures = formData.features.filter((f) => f.trim())

        onSubmit({
            subscriptionName: formData.subscriptionName,
            price: parseFloat(formData.price),
            features: validFeatures,
        })
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold">
                        {editingSubscription ? "Edit Subscription" : "Add Subscription Plan"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Subscription Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subscription Name *
                        </label>
                        <input
                            type="text"
                            name="subscriptionName"
                            value={formData.subscriptionName}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.subscriptionName ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="e.g., Premium Plan"
                        />
                        {errors.subscriptionName && (
                            <p className="text-red-500 text-xs mt-1">{errors.subscriptionName}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price (NPR) *
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="e.g., 2999"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                        )}
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Features *
                        </label>
                        <div className="space-y-2">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter feature"
                                    />
                                    {formData.features.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="text-red-600 hover:text-red-800 p-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addFeature}
                            className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Feature
                        </button>
                        {errors.features && (
                            <p className="text-red-500 text-xs mt-1">{errors.features}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            {editingSubscription ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
