import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
            <h1 className="text-9xl font-bold text-blue-500">404</h1>
            <h2 className="mt-4 text-3xl font-semibold text-gray-800">Page Not Found</h2>
            <p className="mt-2 text-lg text-gray-600">The page you're looking for doesn't exist.</p>
            <Link to="/" className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
