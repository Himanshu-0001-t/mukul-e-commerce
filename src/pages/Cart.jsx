import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast"
import { HiMiniPlus } from "react-icons/hi2";
import { HiMinus } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../context/AuthContext"
import axiosInstance from '../utils/axios';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([])
    const { user } = useAuth()

    const getCartItem = async () => {
        try {
            let resposne = await axiosInstance.get(`/cart/${user}`)

            if (resposne.data.status === "success") {
                setCartItems(resposne.data.data.cart.products)
            } else {
                toast.error(resposne.data.message)
            }
        } catch (error) {
            setCartItems([])
        }
    }

    const updateCartQuantity = async (productId, quantity) => {
        let data = {
            userId: user,
            productId,
            quantity
        }

        try {
            let response = await axiosInstance.patch("/cart/update", data)
            if (response.data.status === "success") {
                toast.success("item quantity updated")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const incrementQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity += 1;
        setCartItems(updatedCartItems);
        updateCartQuantity(cartItems[index].productId._id, cartItems[index].quantity)
    };

    const decrementQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
            setCartItems(updatedCartItems);
            updateCartQuantity(cartItems[index].productId._id, cartItems[index].quantity)
        }
    };

    const deleteCartItem = async (productId) => {
        const data = {
            userId: user,
            productId
        }

        try {
            let response = await axiosInstance.post("/cart/remove", data)
            if (response.data.status === "success") {
                toast.success(response.data.message)
                getCartItem()
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCartItem()
    }, [])

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.quantity * item.productId.price, 0).toFixed(2);
    };

    {
        return cartItems.length > 0 ? <div className="max-w-4xl mx-auto min-h-screen p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6" > Shopping Cart</h1 >
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {cartItems.map((item, index) => {
                            return <tr key={item._id}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 h-32 w-32">
                                    <span className="px-4 py-4 block whitespace-nowrap text-sm font-medium text-gray-900">{item.productId.name}</span>
                                    <img src={item.productId.image} alt={item.productId.name} className='h-full' />
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 items-center">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => decrementQuantity(index)}
                                            className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-black text-lg"
                                        >
                                            <HiMinus />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => incrementQuantity(index)}
                                            className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-black text-lg"
                                        >
                                            <HiMiniPlus />
                                        </button>
                                    </div>

                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 items-center">₹  {item.productId.price}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 items-center">₹  {(item.quantity * item.productId.price).toFixed(2)}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-2xl text-gray-500 text-center hover:cursor-pointer"><MdDelete color='red' onClick={() => deleteCartItem(item.productId._id)} /></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className="flex justify-between items-center p-4 border-t border-gray-200">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-semibold">${calculateTotal()}</span>
                </div>
                <div className="p-4" >
                    <Link to="/checkout" state={{ cartItems }} className="w-full block bg-blue-500 text-white text-center p-3 rounded-lg hover:bg-blue-600" >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div >
            : <div className='min-h-screen flex items-center justify-center'>
                <h1 className='font-bold'>Cart is empty</h1>
            </div>
    }
};

export default CartPage;
