import React from 'react';

const Promotions = () => {
    const promotions = [
        { id: '1', title: 'Summer Sale', description: 'Up to 50% off on selected items', imageUrl: '/image/summer.jpg' },
        { id: '2', title: 'Buy One Get One Free', description: 'On selected products', imageUrl: '/image/buy.jpg' },

    ];

    return (
        <div className="flex flex-col sm:flex-row gap-6">
            {promotions.map((promo) => (
                <div key={promo.id} className="bg-white p-6 rounded-lg shadow-lg flex-1">
                    <img
                        src={promo.imageUrl}
                        alt={promo.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
                    <p>{promo.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Promotions;
