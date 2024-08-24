import React from 'react';
import image from "/image/hero.jpg"
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="relative md:h-[600px] h-96 my-5">
            <img
                src={image}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <h1 className="text-5xl font-bold">Welcome to Our Store</h1>
                <p className="mt-4 text-lg max-w-lg">
                    Discover the best products at unbeatable prices. Shop now and enjoy great deals on your favorite items.
                </p>
                <Link to="/shop" className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full">
                    Shop Now
                </Link>
            </div>
        </div>

    );
};

export default HeroSection;
