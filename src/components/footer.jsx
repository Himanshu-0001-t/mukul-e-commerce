import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-600 text-gray-200 py-8 px-5 md:px-2">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                <div className="space-y-4">
                    <Link to="/" className="text-2xl font-bold text-white">
                        MUKUL E-Commerce
                    </Link>
                    <p className="text-gray-400">
                        Your one-stop shop for the best products at unbeatable prices.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
                        <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                    <ul className="space-y-2">
                        <li className="text-gray-400">Email: info@storename.com</li>
                        <li className="text-gray-400">Phone: +123 456 7890</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                    <ul className="flex space-x-4">
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
                        <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-gray-200 mt-8">
                &copy; {new Date().getFullYear()} MUKUL E-Commerce. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
