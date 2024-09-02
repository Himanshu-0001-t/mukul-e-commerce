import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"


const Header = () => {
    const { user, loading, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <header className="bg-gray-600 shadow-md">
            <div className=" px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center justify-evenly w-full">

                        <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className=" border-transparent text-white hover:border-gray-300 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/shop" className="border-transparent text-white hover:border-gray-300 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Shop
                            </Link>
                            <Link to="contact" className="border-transparent text-white hover:border-gray-300 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Contact
                            </Link>

                        </div>
                        <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>

                            {user ? <> <Link to="/cart" className="border-transparent text-white hover:border-gray-300 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Cart
                            </Link>
                                <Link to="/account" className="border-transparent text-white hover:border-gray-300 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Orders
                                </Link>
                                <button className="border-transparent text-white hover:border-gray-300 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" onClick={() => logout()}>Logout</button>
                            </>
                                :
                                <>

                                    <Link to="/signup" className="border-transparent text-white hover:border-gray-300 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                        signup
                                    </Link>
                                    <Link to="/signIn" className="border-transparent text-white hover:border-gray-300 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                        login
                                    </Link></>}
                        </div>
                    </div>
                    <div className="flex items-center sm:hidden">
                        <button
                            type="button"
                            className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded="false"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link to="/" className="border-transparent text-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsOpen((prev) => !prev)}>
                            Home
                        </Link>
                        <Link to="/shop" className="border-transparent text-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsOpen((prev) => !prev)}>
                            Shop
                        </Link>
                        <Link to="contact" className="border-transparent text-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsOpen((prev) => !prev)}>
                            Contact
                        </Link>

                        {user ? <> <Link to="/cart" className="border-transparent text-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsOpen((prev) => !prev)}>
                            Cart
                        </Link>
                            <Link to="/account" className="border-transparent text-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsOpen((prev) => !prev)}>
                                Orders
                            </Link>
                            <button className="border-transparent text-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => logout()}>Logout</button>
                        </>
                            :
                            <>
                                <Link to="/signup" className="border-transparent text-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsOpen((prev) => !prev)}>
                                    signup
                                </Link>
                                <Link to="/signIn" className="border-transparent text-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsOpen((prev) => !prev)}>
                                    login
                                </Link></>}


                    </div>
                </div>
            )
            }
        </header >
    );
}

export default Header;
