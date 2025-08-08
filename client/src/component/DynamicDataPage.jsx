import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicDataPage = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const pathToCategory = {
    '/deluxe-rooms': 'deluxerooms',
    '/family-rooms': 'familyrooms',
    '/restaurants': 'restaurants',
    '/spa': 'spa',
    '/fitness': 'fitnesscenter',
    '/special-events': 'specialevents',
    '/concierge': 'conciergeservices',
    '/meeting-rooms': 'meetingrooms',
    '/room-service': 'roomservice',
    '/breakfast': 'breakfast',
    '/menus': 'menus',
    '/room-features': 'roomfeatures',
    '/swimming-pool': 'swimmingpool'
  };

  const category = pathToCategory[location.pathname];

  useEffect(() => {
    if (!category) return;

    fetch(`https://paradise-backend-fkix.onrender.com/api/data/${category}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setTitle(location.pathname.replace('/', '').replace('-', ' '));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [location.pathname]);

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold capitalize text-center mb-6">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-4">
            {item.images?.[0] && (
              <img src={item.images[0]} alt={item.title || item.name || item.item} className="w-full h-48 object-cover rounded-md mb-3" />
            )}
            <h2 className="text-xl font-semibold mb-1">{item.title || item.name || item.item || item.service}</h2>
            {item.description && <p className="text-gray-600 text-sm">{item.description}</p>}
            {item.pricePerNight && <p className="mt-2 text-green-700 font-medium">₹{item.pricePerNight} / night</p>}
            {item.price && !item.pricePerNight && <p className="mt-2 text-green-700 font-medium">₹{item.price}</p>}
            {item.available !== undefined && (
              <p className={`mt-1 font-semibold ${item.available ? 'text-green-600' : 'text-red-500'}`}>
                {item.available ? 'Available' : 'Not Available'}
              </p>
            )}
            {item.amenities && (
              <ul className="mt-2 text-sm list-disc list-inside text-gray-700">
                {item.amenities.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicDataPage;
