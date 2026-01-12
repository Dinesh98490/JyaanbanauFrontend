import { useNavigate } from "react-router-dom"
import { XCircle } from "lucide-react"

export default function PaymentFailure() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
                <p className="text-gray-600 mb-6">
                    Your payment could not be processed. This could be due to:
                </p>

                <ul className="text-left text-gray-600 mb-6 space-y-2">
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Payment was cancelled</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Insufficient balance</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Network issues</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Incorrect payment details</span>
                    </li>
                </ul>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate("/customer/membership")}
                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => navigate("/customer/dashboard")}
                        className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    )
}
