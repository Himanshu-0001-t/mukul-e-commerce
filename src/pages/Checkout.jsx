import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
import axiosInstance from '../utils/axios';

const CheckoutPage = () => {
    let navigate = useNavigate()
    const { user } = useAuth()

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    let localtion = useLocation()
    let state = localtion.state

    const [order, setOrder] = useState({
        shippingAddress: {
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: ""
        }
    })


    useEffect(() => {
        if (state?.cartItems) {
            setProducts(state?.cartItems)
        } else if (state?.product) {
            let productArr = Array(state?.product)
            setProduct(productArr)
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        const nameParts = name.split(".");

        if (nameParts.length === 1) {

            setOrder((prevOrder) => ({
                ...prevOrder,
                [name]: value
            }));
        } else {

            setOrder((prevOrder) => ({
                ...prevOrder,
                [nameParts[0]]: {
                    ...prevOrder[nameParts[0]],
                    [nameParts[1]]: value
                }
            }));
        }
    };

    const calculateTotalProducts = () => {
        return products.reduce((acc, product) => acc + product.productId.price * product.quantity, 0).toFixed(0);
    };
    const calculateTotalProduct = () => {
        return product.reduce((acc, product) => acc + product.price * state.quantity, 0).toFixed(0);
    };

    let totalProduct

    if (products.length > 0) {
        totalProduct = products.map((product) => product)
    } else if (product.length > 0) {
        totalProduct = product
    }

    let userData = {
        "userId": user,
        "products": totalProduct,

        "paymentInfo": {
            "method": "credit_card"
        },
        "shippingAddress": {
            "address": order.shippingAddress.address,
            "city": order.shippingAddress.city,
            "state": order.shippingAddress.state,
            "postalCode": order.shippingAddress.postalCode,
            "country": order.shippingAddress.country
        }
    }

    const hadnleSubmit = (e) => {
        e.preventDefault();

        const CreateOrder = async () => {
            try {
                let response = await axiosInstance.post("/order", userData)

                if (response.data.status === "success") {
                    navigate('/order-placed')
                }

            } catch (error) {
                console.log(error)
            }
        }
        CreateOrder()
    }

    return (
        <div className="max-w-4xl mx-auto md:p-8">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">Shipping Information</h2>
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4 text-black">Checkout</h1>

                    {product.length > 0 ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            {product.map((product) => (
                                <div key={product._id} className="flex items-center mb-4">
                                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover mr-4" />
                                    <div className='text-black'>
                                        <h2 className="text-lg font-semibold">{product.name}</h2>
                                        <p className="text-sm">Quantity: {state.quantity}</p>
                                        <p className="text-sm font-bold">Price:Rs {product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border p-4 rounded-md shadow-md text-black">
                            <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>{calculateTotalProduct()} Rs</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>100  Rs</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="font-bold">Total</span>
                                <span className="font-bold">${(parseFloat(calculateTotalProduct()) + 100).toFixed(0)}</span>
                            </div>

                        </div>
                    </div> : ""}

                    {products.length > 0 ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            {products.map((product) => (
                                <div key={product._id} className="flex items-center mb-4">
                                    <img src={product.productId.image} alt={product.productId.name} className="w-20 h-20 object-cover mr-4" />
                                    <div className='text-black'>
                                        <h2 className="text-lg font-semibold">{product.productId.name}</h2>
                                        <p className="text-sm">Quantity: {product.quantity}</p>
                                        <p className="text-sm font-bold">Price:Rs {product.productId.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border p-4 rounded-md shadow-md text-black max-h-60">
                            <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>{calculateTotalProducts()} Rs</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>50  Rs</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="font-bold">Total</span>
                                <span className="font-bold">{(parseFloat(calculateTotalProducts()) + 50).toFixed(0)} Rs</span>
                            </div>

                        </div>
                    </div> : ""}

                </div>

                <form className='text-black' onSubmit={hadnleSubmit}>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="address">Shipping Address</label>
                        <input
                            type="text"
                            name="shippingAddress.address"
                            value={order.shippingAddress.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
                            <input
                                type="text"
                                name="shippingAddress.city"
                                value={order.shippingAddress.city}
                                onChange={handleChange}
                                placeholder="City"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="state">State</label>
                            <input
                                type="text"
                                name="shippingAddress.state"
                                value={order.shippingAddress.state}
                                onChange={handleChange}
                                placeholder="State"
                                className="w-full p-2 border border-gray-300 rounded"
                            />

                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="zip">ZIP Code</label>
                            <input
                                type="text"
                                name="shippingAddress.postalCode"
                                value={order.shippingAddress.postalCode}
                                onChange={handleChange}
                                placeholder="Postal Code"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="country">Country</label>
                            <input
                                type="text"
                                name="shippingAddress.country"
                                value={order.shippingAddress.country}
                                onChange={handleChange}
                                placeholder="Country"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h2 className="text-2xl font-semibold mb-4 text-black">Payment Information</h2>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="expiryDate">Expiry Date</label>
                            <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="MM/YY"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"

                    >
                        Complete Purchase
                    </button>
                </form>

            </div>
        </div>
    );
};

export default CheckoutPage;
