import React from 'react';
import { Link } from 'react-router-dom';
import { fetchRecommendedProducts } from '../utils//api';

const ProductRecommendations = () => {
  const [recommendations, setRecommendations] = React.useState([]);

  React.useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await fetchRecommendedProducts();
        setRecommendations(data);
      } catch (error) {
        console.error("Failed to fetch recommendations", error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recommendations.map((product) => (
        <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg">
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain rounded-t-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductRecommendations;
