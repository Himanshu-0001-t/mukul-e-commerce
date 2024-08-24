import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductSkeleton from '../components/skeleton';


const Shop = () => {
    let localtion = useLocation()
    let state = localtion.state

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState(state ? state.search : "")
    const [loading, setLoading] = useState(false)

    const searchProduct = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`https://e-comm-backend-pkj2.onrender.com/api/products/q/?search=${search}`)

            if (response.data.status === "success") {
                setProducts(response.data.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            try {
                let data = await fetchProducts()
                if (data) {
                    setProducts(data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        if (state?.search) {
            setSearch(() => state.search)
            searchProduct()
        } else {
            getProduct()
        }
    }, [])

    return (
        <div className="container mx-auto p-8 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Shop Our Products</h1>
            <div className='flex flex-col md:flex-row items-center justify-center gap-5 my-5'>
                <input type="search" className='p-3 rounded-md w-full border-2 md:w-[30%] text-black ' placeholder='search product' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className='py-3 px-6 rounded-md bg-indigo-500 font-bold' onClick={() => searchProduct()}>Search</button>
            </div>

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
                    ))
                }
            </div>
        </div>
    );
};

export default Shop;
