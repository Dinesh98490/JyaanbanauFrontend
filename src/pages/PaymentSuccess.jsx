import { useEffect, useState } from "react"
import { CheckCircle, Loader } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import api from "../api/api"

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [verifying, setVerifying] = useState(true)
    const [paymentDetails, setPaymentDetails] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const data = searchParams.get("data")

                if (!data) {
                    setError("No payment data received")
                    setVerifying(false)
                    return
                }

                // Verify payment with backend
                const response = await api.get(`/esewa/verify?data=${encodeURIComponent(data)}`)

                if (response.data.success) {
                    setPaymentDetails(response.data.data)

                    // Create payment record in database
                    const username = localStorage.getItem("username")
                    if (username) {
                        await api.post("/payments", {
                            name: username,
                            paymentMethod: "eSewa",
                            subscription: "Premium Plan", // You can get this from the payment flow
                            price: response.data.data.total_amount,
                        })
                    }
                } else {
                    setError(response.data.message || "Payment verification failed")
                }
            } catch (err) {
                console.error("Payment verification error:", err)
                setError("Failed to verify payment. Please contact support.")
            } finally {
                setVerifying(false)
            }
        }

        verifyPayment()
    }, [searchParams])

    if (verifying) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment...</h2>
                    <p className="text-gray-600">Please wait while we confirm your payment</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate("/customer/payment")}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Back to Payment
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                    Your payment has been processed successfully.
                </p>

                {paymentDetails && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Transaction ID:</span>
                                <span className="font-medium">{paymentDetails.transaction_code}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Amount:</span>
                                <span className="font-medium">NPR {paymentDetails.total_amount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className="font-medium text-green-600">{paymentDetails.status}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate("/customer/dashboard")}
                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Go to Dashboard
                    </button>
                    <button
                        onClick={() => navigate("/customer/payment")}
                        className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
                    >
                        View Payments
                    </button>
                </div>
            </div>
        </div>
    )
}
