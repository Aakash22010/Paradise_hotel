import React from 'react';

const CategoryCard = ({ item }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full md:w-[30%]">
      <img src={item.images[0]} alt={item.title} className="w-full h-60 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{item.title}</h3>
        <p className="text-gray-600 mb-2">{item.description}</p>
        <div className="text-sm text-gray-500">
          <p><strong>Price:</strong> ${item.price}</p>
          <p><strong>Available:</strong> {item.available ? "Yes" : "No"}</p>
          <p><strong>Amenities:</strong> {item.amenities.join(', ')}</p>
          <p><strong>Timing:</strong> {item.timing}</p>
          <p><strong>Location:</strong> {item.location}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;