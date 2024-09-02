import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductById } from '../utils/api';
import ProductRecommendations from './ProductRecommendation';

import { toast } from 'react-hot-toast';
import { useAuth } from "../context/AuthContext"
import axiosInstance from '../utils/axios';


const ProductDetailPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const { user } = useAuth()


    const hadnleAddToCart = async () => {
        if (!user) {
            return toast.error("Please login first")
        }

        const cartData = {
            userId: user,
            product:
            {
                productId: product._id,
                quantity: 1
            }
        }

        try {
            let response = await axiosInstance.post(`/cart/`, cartData)

            if (response.data.status === "success") {
                toast.success("item add in cart")
            } else {
                toast.error(response.data.error)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div className='h-screen flex items-center justify-center text-4xl'>Loading...</div>;
    let quantity = 1

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center lg:flex-row">

                <div className="flex-1 my-5">
                    <img
                        src={product.image}
                        alt={product.name}
                        className=" object-contain rounded-lg shadow-lg"
                    />
                </div>

                <div className="flex-1 lg:ml-8 my-2">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-lg text-gray-700 mb-4 max-h-60 overflow-auto">{product.description}</p>
                    <p className="text-xl font-semibold text-gray-900 mb-4">{product.price} Rs</p>
                    <div className='flex items-center justify-evenly'>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={() => hadnleAddToCart()}>
                            Add to Cart
                        </button>
                        <Link to="/checkout" state={{ product, quantity }} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Buy now
                        </Link>
                    </div>
                </div>
            </div>


            <div className="my-20">
                <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
                <ProductRecommendations />
            </div>
        </div>
    );
};

export default ProductDetailPage;
