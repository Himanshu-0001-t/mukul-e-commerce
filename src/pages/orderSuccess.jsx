import React from "react";

const OrderSuccess = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                <div className="text-green-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-20 h-20 mx-auto"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2l4-4m0 9l6-6m-6 6V4"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold mt-4">Order Placed Successfully!</h2>
                <p className="text-gray-600 mt-2">
                    Thank you for your purchase! Your order has been placed and is being processed.
                    You will receive an email confirmation shortly.
                </p>
                <button
                    className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200"
                    onClick={() => window.location.href = '/'}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
