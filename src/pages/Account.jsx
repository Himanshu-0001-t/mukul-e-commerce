import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext"
import axiosInstance from '../utils/axios';

const UserAccountPage = () => {
    const { user } = useAuth()
    const [orders, setOrders] = useState([])


    const getOrders = async () => {
        let resposne = await axiosInstance.get(`/orders/${user}`)

        if (resposne.data.status === "success") {
            setOrders(resposne.data.data)
        }
    }


    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div className="container mx-auto p-4 h-screen">
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Order History</h2>

                <ul>
                    {orders.map((order) => (
                        <li key={order._id} className="border-b border-gray-200 py-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Order ID :{order._id}</span>
                                <span className="text-gray-600">status : {order.status}</span>
                                <span className="font-semibold"> Price : {order.totalPrice} Rs</span>
                            </div>

                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default UserAccountPage;
