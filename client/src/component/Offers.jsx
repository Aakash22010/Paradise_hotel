import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOffers = async () => {
    try {
      const res = await axios.get('https://paradise-backend-fkix.onrender.com/api/offers');
      setOffers(res.data);
    } catch (error) {
      console.error('Failed to fetch offers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Exclusive Offers</h1>
          <p className="text-gray-600 mt-2">Enjoy amazing deals curated just for you!</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 text-lg">Loading offers...</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800">{offer.title}</h2>
                  <p className="text-gray-600 mt-2">{offer.description}</p>
                  <p className="text-sm text-blue-600 mt-4">
                    Valid Till: {new Date(offer.validTill).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
