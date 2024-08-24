import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/Hero';
import Promotions from '../components/promaotion';

import laptop from "/image/msi.jpg"
import mobile from "/image/redmi 13.jpg"
import hedphone from "/image/jbl.jpg"

import { fetchProductHome } from '../utils/api';
import ProductSkeleton from '../components/skeleton';

const Homepage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            let data = await fetchProductHome()
            if (data) {
                setProducts(data)
            }
            setLoading(false)
        }
        getProduct()
    }, [])


    return (
        <div className="container mx-auto p-4">
            <HeroSection />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="relative bg-gray-100 p-6 rounded-lg text-center h-56">
                    <img
                        src={laptop}
                        alt="Laptop"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                    <div className="relative z-10">
                        <h2 className="text-xl font-semibold text-white">Laptop</h2>
                        <Link to="/shop" state={{ search: "laptop" }}>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
                                View More
                            </button>
                        </Link>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                </div>


                <div className="relative bg-gray-100 p-6 rounded-lg text-center">
                    <img
                        src={mobile}
                        alt="Smartphone"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                    <div className="relative z-10">
                        <h2 className="text-xl font-semibold text-white">SmartPhone</h2>
                        <Link to="/shop" state={{ search: "smartphone" }}>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
                                View More
                            </button>
                        </Link>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                </div>

                <div className="relative bg-gray-100 p-6 rounded-lg text-center">
                    <img
                        src={hedphone}
                        alt="Headphone"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                    <div className="relative z-10">
                        <h2 className="text-xl font-semibold text-white">HeadPhone</h2>
                        <Link to="/shop" state={{ search: "headphone" }}>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
                                View More
                            </button>
                        </Link>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                </div>
            </div>


            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {loading ? <ProductSkeleton /> :
                        products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
                                <Link to={`/product/${product._id}`}>
                                    <img src={product.image} alt={product.name} className="w-full h-64 object-contain" />
                                    <div className="p-6">
                                        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                                        <p className="text-gray-600 mt-2">{product.price}</p>
                                        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                                            View Details
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>

                <Promotions />
            </div>
        </div>
    );
};

export default Homepage;
